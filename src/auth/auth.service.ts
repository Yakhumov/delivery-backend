import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

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
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.log(`[DEV] Email to ${to}: код ${code}`);
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Uhhe" <${user}>`,
      to,
      subject: 'Код подтверждения',
      html: `
        <div style="font-family:sans-serif;max-width:400px;margin:0 auto">
          <h2 style="color:#2ECC71">Ваш код входа</h2>
          <p style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#111">${code}</p>
          <p style="color:#666">Код действителен 10 минут.</p>
        </div>
      `,
    });
  }
}
