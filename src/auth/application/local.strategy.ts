import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateAuthService } from './validate-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateAuthService: ValidateAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return this.validateAuthService.execute({ username, password });
  }
}
