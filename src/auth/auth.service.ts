import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface OtpEntry {
  code: string;
  expiresAt: number;
}

@Injectable()
export class AuthService {
  private readonly otpStore = new Map<string, OtpEntry>();

  constructor(private readonly jwt: JwtService) {}

  async sendOtp(phone: string): Promise<{ message: string }> {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    this.otpStore.set(phone, { code, expiresAt: Date.now() + 5 * 60 * 1000 });

    console.log(`[OTP] ${phone} → ${code}`);
    await this.sendSms(phone, `Ваш код: ${code}`);
    return { message: 'Код отправлен' };
  }

  verifyOtp(phone: string, code: string): { token: string; phone: string } {
    const entry = this.otpStore.get(phone);

    if (!entry) throw new BadRequestException('Код не найден или истёк');
    if (Date.now() > entry.expiresAt) {
      this.otpStore.delete(phone);
      throw new BadRequestException('Код истёк');
    }
    if (entry.code !== code) throw new BadRequestException('Неверный код');

    this.otpStore.delete(phone);
    const token = this.jwt.sign({ phone });
    return { token, phone };
  }

  private async sendSms(phone: string, message: string): Promise<void> {
    const apiId = process.env.SMSRU_API_ID;
    if (!apiId) {
      // В режиме разработки просто выводим код в консоль
      console.log(`[DEV] SMS to ${phone}: ${message}`);
      return;
    }

    const url = new URL('https://sms.ru/sms/send');
    url.searchParams.set('api_id', apiId);
    url.searchParams.set('to', phone);
    url.searchParams.set('msg', message);
    url.searchParams.set('json', '1');
    if (process.env.SMSRU_TEST === '1') url.searchParams.set('test', '1');

    const res = await fetch(url.toString());
    const data = (await res.json()) as { status: string; status_code: number };

    console.log('[SMS.RU response]', JSON.stringify(data));

    if (data.status !== 'OK') {
      throw new BadRequestException(`Ошибка SMS: код ${data.status_code}`);
    }
  }
}
