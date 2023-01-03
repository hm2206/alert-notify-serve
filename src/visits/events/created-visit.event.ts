import { Injectable } from '@nestjs/common';
import { VisitInterface } from '../domain/visit.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { ClientInterface } from 'src/clients/domain/client.interface';

export const createdVisitEventName = 'visits.created';

@Injectable()
export class CreatedVisitEvent {
  constructor(private mailer: MailerService) {}

  @OnEvent(createdVisitEventName)
  async handle({ visit, client }: CreatedVisitRequest) {
    // validar envio
    if (!visit.isSend) return;
    // enviar email
    await this.mailer
      .sendMail({
        to: client.email,
        subject: 'Descuento del 15%',
        template: './descuento',
        context: {
          name: client.name,
        },
      })
      .then((res) => console.log('subject', res))
      .catch(() => null);
  }
}

export interface CreatedVisitRequest {
  visit: VisitInterface;
  client: ClientInterface;
}
