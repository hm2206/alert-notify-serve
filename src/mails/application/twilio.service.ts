import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

@Injectable()
export class TwilioService {
  private twilio: twilio.Twilio;
  private phone: string;

  constructor(private config: ConfigService) {
    const accountSid = this.config.get('TWILIO_ACCOUNT_SID');
    const authToken = this.config.get('TWILIO_AUTH_TOKEN');
    this.phone = this.config.get('TWILIO_AUTH_PHONE');
    this.twilio = twilio(accountSid, authToken);
  }

  async sendWhatsapp(request: SendWhatsappRequest) {
    return this.twilio.messages.create({
      from: `whatsapp:${this.phone}`,
      to: `whatsapp:${request.to}`,
      body: request.body,
    });
  }
}

export interface SendWhatsappRequest {
  to: string;
  body: string;
}
