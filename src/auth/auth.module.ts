import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ValidateAuthService } from './application/validate-auth.service';
import { LocalStrategy } from './application/local.strategy';
import { HttpAuthController } from './infrastruture/http-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenerateTokenAuhtService } from './application/generate-token-auth.service';
import { JwtStrategy } from './application/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('APP_SECRET') || 'dev',
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [
    ValidateAuthService,
    GenerateTokenAuhtService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [HttpAuthController],
})
export class AuthModule {}
