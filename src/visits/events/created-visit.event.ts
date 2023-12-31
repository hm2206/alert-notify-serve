import { Injectable } from '@nestjs/common';
import { VisitInterface } from '../domain/visit.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { ClientInterface } from 'src/clients/domain/client.interface';
import { isPhoneNumber } from 'class-validator';
import { TwilioService } from 'src/mails/application/twilio.service';

export const createdVisitEventName = 'visits.created';

@Injectable()
export class CreatedVisitEvent {
  constructor(private mailer: MailerService, private twilio: TwilioService) {}

  @OnEvent(createdVisitEventName)
  async handle({ visit, client }: CreatedVisitRequest) {
    // validar envio
    if (!visit.isSend) return;
    // enviar email
    await Promise.all([this.sendMail(client), this.sendWhatsapp(client)]).catch(
      () => null,
    );
  }

  private async sendMail(client: ClientInterface) {
    await this.mailer
      .sendMail({
        to: client.email,
        subject: 'Descuento del 15%',
        template: './descuento',
        context: {
          name: client.name,
        },
      })
      .catch((err) => console.log(err));
  }

  private async sendWhatsapp(client: ClientInterface) {
    const isPhoneValid = isPhoneNumber(client.phone || '');
    if (!isPhoneValid) return;
    await this.twilio.sendWhatsapp({
      to: client.phone,
      //body: '¡Hola! Jean 👋. Te ofrecemos un descuento especial por tu visita a *Carranza-Motors*, para conocer más sobre esta promoción no dude en escribirnos.',
      body:  `¡Hola! ${client.name} 👋. Te ofrecemos un descuento especial por tu visita a *Carranza-Motors*, para conocer más sobre esta promoción no dude en escribirnos. 👨‍🔧`
    });
  }
}

export interface CreatedVisitRequest {
  visit: VisitInterface;
  client: ClientInterface;
}
