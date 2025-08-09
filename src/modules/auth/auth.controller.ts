import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseHelper } from '@/common/helpers/response.helper';
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

    const result = await this.authService.login(email, password);
    return ResponseHelper.success(result, 'Login successful');
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: AuthenticatedRequest) {
    const user = await this.userService.findById(req.user.uniqueID);
    return ResponseHelper.success(user, 'Profile retrieved successfully');
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    const token = await this.authService.refreshToken(refreshToken ?? '');
    return {
      success: true,
      message: 'Token refreshed successfully',
      data: token,
    };
  }
}
