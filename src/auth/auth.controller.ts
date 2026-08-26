import { Controller, Post, Body, Delete, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('send-otp')
  sendOtp(@Body() dto: SendOtpDto) {
    return this.service.sendOtp(dto.phone);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.service.verifyOtp(dto.phone, dto.code);
  }

  @Delete('account')
  deleteAccount(@Headers('authorization') authorization?: string) {
    return this.service.deleteAccount(authorization);
  }
}
