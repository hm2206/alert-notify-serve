import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('APP_SECRET') || 'dev',
    });
  }

  async validate(payload: any): Promise<JwtResponse> {
    return {
      id: payload.sub,
      username: payload.username,
      roleId: payload.roleId,
    };
  }
}

export interface JwtResponse {
  id: string;
  username: string;
  roleId: string;
}
