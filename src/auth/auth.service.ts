import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Resend } from 'resend';

interface OtpEntry {
  code: string;
  expiresAt: number;
}

@Injectable()
export class AuthService {
  private readonly otpStore = new Map<string, OtpEntry>();

  constructor(private readonly jwt: JwtService) {}

  async sendOtp(email: string): Promise<{ message: string }> {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    this.otpStore.set(email, { code, expiresAt: Date.now() + 10 * 60 * 1000 });

    console.log(`[OTP] ${email} → ${code}`);
    await this.sendEmail(email, code);
    return { message: 'Код отправлен на почту' };
  }

  verifyOtp(email: string, code: string): { token: string; email: string } {
    const entry = this.otpStore.get(email);

    if (!entry) throw new BadRequestException('Код не найден или истёк');
    if (Date.now() > entry.expiresAt) {
      this.otpStore.delete(email);
      throw new BadRequestException('Код истёк');
    }
    if (entry.code !== code) throw new BadRequestException('Неверный код');

    this.otpStore.delete(email);
    const token = this.jwt.sign({ email });
    return { token, email };
  }

  private async sendEmail(to: string, code: string): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log(`[DEV] Email to ${to}: код ${code}`);
      return;
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Uhhe <onboarding@resend.dev>',
      to,
      subject: 'Код подтверждения',
      html: `
        <div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:24px">
          <h2 style="color:#2ECC71;margin-bottom:8px">Ваш код входа</h2>
          <p style="font-size:40px;font-weight:bold;letter-spacing:12px;color:#111;margin:16px 0">${code}</p>
          <p style="color:#888;font-size:14px">Код действителен 10 минут.</p>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend error]', error);
      throw new BadRequestException('Ошибка отправки письма');
    }
  }
}
