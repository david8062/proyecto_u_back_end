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
    };
  }
}
