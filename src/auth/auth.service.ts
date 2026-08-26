import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

interface OtpEntry {
  code: string;
  expiresAt: number;
}

interface AuthTokenPayload {
  phone?: string;
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

@Injectable()
export class AuthService {
  private readonly otpStore = new Map<string, OtpEntry>();

  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async sendOtp(phone: string): Promise<{ message: string }> {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    this.otpStore.set(phone, { code, expiresAt: Date.now() + 10 * 60 * 1000 });

    console.log(`[OTP] ${phone} → ${code}`);
    await this.sendSms(phone, `Ваш код Uhhe: ${code}`);
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

  async deleteAccount(authorization?: string): Promise<{ message: string; deletedOrders: number }> {
    const token = this.extractBearerToken(authorization);
    const payload = this.verifyToken(token);

    if (!payload.phone) {
      throw new UnauthorizedException('Token does not contain phone');
    }

    const phone = normalizePhone(payload.phone);

    const deletedOrders = await this.prisma.$transaction(async (tx) => {
      const orders = await tx.order.findMany({
        where: { phone },
        select: { id: true },
      });
      const orderIds = orders.map((order) => order.id);

      if (orderIds.length === 0) return 0;

      await tx.orderItem.deleteMany({
        where: { orderId: { in: orderIds } },
      });
      const result = await tx.order.deleteMany({
        where: { id: { in: orderIds } },
      });

      return result.count;
    });

    return {
      message: 'Account deletion completed',
      deletedOrders,
    };
  }

  private async sendSms(rawPhone: string, message: string): Promise<void> {
    const phone = rawPhone.replace(/\D/g, '');
    const apiId = process.env.SMSRU_API_ID;
    if (!apiId) {
      console.log(`[DEV] SMS to ${phone}: ${message}`);
      return;
    }

    const url = new URL('https://sms.ru/sms/send');
    url.searchParams.set('api_id', apiId);
    url.searchParams.set('to', phone);
    url.searchParams.set('msg', message);
    url.searchParams.set('json', '1');
    if (process.env.SMSRU_TEST === '1') url.searchParams.set('test', '1');
       if (process.env.SMSRU_API_ID) url.searchParams.set('from', process.env.SMSRU_API_ID);

    const res = await fetch(url.toString());
    const data = (await res.json()) as {
      status: string;
      status_code: number;
      sms?: Record<string, { status: string; status_code: number; status_text: string }>;
    };

    console.log('[SMS.RU]', JSON.stringify(data));

    if (data.status !== 'OK') {
      throw new BadRequestException(`Ошибка SMS: код ${data.status_code}`);
    }

    const smsEntry = data.sms ? Object.values(data.sms)[0] : null;
    if (smsEntry && smsEntry.status === 'ERROR') {
      throw new BadRequestException(`Ошибка доставки SMS: ${smsEntry.status_text}`);
    }
  }

  private extractBearerToken(authorization?: string): string {
    const [scheme, token] = authorization?.split(' ') ?? [];

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Bearer token is required');
    }

    return token;
  }

  private verifyToken(token: string): AuthTokenPayload {
    try {
      return this.jwt.verify<AuthTokenPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
