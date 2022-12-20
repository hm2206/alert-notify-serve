import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request as IRequest } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ValidateAuthDto } from './dtos/validate-auth.dto';
import { GenerateTokenAuhtService } from '../application/generate-token-auth.service';
import { UserInterface } from 'src/users/domain/user.interface';

@ApiTags('Auth')
@Controller('auth')
export class HttpAuthController {
  constructor(private generateToken: GenerateTokenAuhtService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: ValidateAuthDto })
  async login(@Request() req: IRequest) {
    return this.generateToken.execute(req.user as UserInterface);
  }
}
