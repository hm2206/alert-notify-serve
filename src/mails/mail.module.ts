import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { TwilioService } from './application/twilio.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: '5231b391738bf4',
          pass: '4381f95d1a591f',
        },
      },
      defaults: {
        from: 'send@example.com',
      },
      preview: true,
      template: {
        dir: resolve(__dirname, './templates/'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [TwilioService],
  exports: [TwilioService],
})
export class MailModule {}
