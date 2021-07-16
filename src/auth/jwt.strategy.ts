import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configService.get('ignoreExpiration'),
      secretOrKey: configService.get('jwt.secret'),
    });
  }
  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      station: payload.station,
      role: payload.role,
    };
  }
}
