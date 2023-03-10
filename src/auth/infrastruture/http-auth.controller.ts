import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request as IRequest } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ValidateAuthDto } from './dtos/validate-auth.dto';
import { GenerateTokenAuhtService } from '../application/generate-token-auth.service';
import { UserInterface } from 'src/users/domain/user.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FindUserService } from 'src/users/application/find-user.service';

@ApiTags('Auth')
@Controller('auth')
export class HttpAuthController {
  constructor(
    private generateToken: GenerateTokenAuhtService,
    private findUserService: FindUserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: ValidateAuthDto })
  async login(@Request() req: IRequest) {
    return this.generateToken.execute(req.user as UserInterface);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req: IRequest) {
    const user: any = req.user;
    return await this.findUserService.execute({ id: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validate() {
    return true;
  }
}
