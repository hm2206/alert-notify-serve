import { Injectable } from '@nestjs/common';
import { VisitInterface } from '../domain/visit.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { ClientInterface } from 'src/clients/domain/client.interface';
import { TwilioService } from 'src/mails/application/twilio.service';
import { isPhoneNumber } from 'class-validator';

export const createdVisitEventName = 'visits.created';

@Injectable()
export class CreatedVisitEvent {
  constructor(private mailer: MailerService, private twilio: TwilioService) {}

  @OnEvent(createdVisitEventName)
  async handle({ visit, client }: CreatedVisitRequest) {
    // validar envio
    if (!visit.isSend) return;
    // enviar email
    Promise.all([this.sendMail(client), this.sendWhatsapp(client)]).catch(
      () => null,
    );
  }

  private async sendMail(client: ClientInterface) {
    await this.mailer.sendMail({
      to: client.email,
      subject: 'Descuento del 15%',
      template: './descuento',
      context: {
        name: client.name,
      },
    });
  }

  private async sendWhatsapp(client: ClientInterface) {
    const isPhoneValid = isPhoneNumber(client.phone || '');
    if (!isPhoneValid) return;
    await this.twilio.sendWhatsapp({
      to: client.phone,
      body: `Acabas de recibir el 15% de descuento en tu próxima visita!!!`,
    });
  }
}

export interface CreatedVisitRequest {
  visit: VisitInterface;
  client: ClientInterface;
}
