import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { TwilioService } from './application/twilio.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const transport = {
          host: config.get('MAIL_HOST', ''),
          port: parseInt(config.get('MAIL_PORT', '')),
          ignoreTLS: true,
          secure: JSON.parse(config.get('MAIL_SECURE', 'false')),
          auth: {
            user: config.get('MAIL_USER', ''),
            pass: config.get('MAIL_PASS', ''),
          },
        };
        // response
        return {
          transport: transport,
          defaults: {
            from: config.get('MAIL_FROM', ''),
          },
          preview: false,
          template: {
            dir: resolve(__dirname, './templates/'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  providers: [TwilioService],
  exports: [TwilioService],
})
export class MailModule {}
