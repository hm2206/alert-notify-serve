import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/users/domain/user.interface';

@Injectable()
export class GenerateTokenAuhtService {
  constructor(private jwtService: JwtService) {}

  async execute(user: UserInterface) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
