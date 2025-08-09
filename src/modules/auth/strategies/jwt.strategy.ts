import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string; // ID del usuario
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string, // Forzamos a string
    });
  }

  validate(payload: JwtPayload) {
    // Esto es lo que estará disponible en req.user
    return {
      uniqueID: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
