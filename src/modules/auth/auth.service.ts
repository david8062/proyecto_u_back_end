import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(identifier: string, password: string) {
    const user =
      (await this.authRepository.findByEmail(identifier)) ||
      (await this.authRepository.findByCode(identifier));

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.has_password) {
      throw new UnauthorizedException('User does not have a password set up');
    }

    const isPasswordValid = await bcrypt.compare(password, user.has_password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentiales no matching');
    }

    const payload = {
      sub: user.uniqueID,
      email: user.email,
      role: user.rol_uuid,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      refreshToken: null,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      // Aquí podrías validar si el usuario sigue activo, etc.
      const newPayload = {
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      const newAccessToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      });

      return { accessToken: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException(
        'Refresh token inválido o expirado' +
          (e instanceof Error ? e.message : ''),
      );
    }
  }
}
