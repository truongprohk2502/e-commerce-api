import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractJWT]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      emailAddress: payload.emailAddress,
      role: payload.role,
    };
  }
}

function extractJWT(req: Request): string | null {
  return req.cookies && 'jwt' in req.cookies ? req.cookies.jwt : null;
}
