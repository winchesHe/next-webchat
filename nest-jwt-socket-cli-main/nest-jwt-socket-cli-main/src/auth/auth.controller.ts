import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.body);
  }

  // 注册
  @UseGuards(AuthGuard('local'))
  @Post('/register')
  async register(@Req() req: Request) {
    return this.authService.register(req.body);
  }
}
