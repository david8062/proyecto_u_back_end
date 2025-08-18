import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { UsersService } from '@/modules/users/users.service';
import { Request as ExpressRequest } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    uniqueID: string;
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Email and password must be strings');
    }

    return this.authService.login(email, password); // interceptor lo envuelve
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: AuthenticatedRequest) {
    return this.userService.findById(req.user.uniqueID);
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken ?? '');
  }
}
