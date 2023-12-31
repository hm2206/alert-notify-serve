import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import sequelize, { Op } from 'sequelize';
import { ClientOrm } from 'src/database/domain/client.orm';
import { TwilioService } from 'src/mails/application/twilio.service';

@Injectable()
export class DailyClientTask {
  constructor(private mailer: MailerService, private twilio: TwilioService) {}

  @Cron('0 5 * * *')
  async handle() {
    const currentDate = DateTime.now();
    const clients = await ClientOrm.findAll({
      where: {
        [Op.and]: [
          sequelize.literal(
            `EXTRACT(MONTH FROM "dateOfBirth") = ${currentDate.month}`,
          ),
          sequelize.literal(
            `EXTRACT(DAY FROM "dateOfBirth") = ${currentDate.day}`,
          ),
        ],
      },
    });
    // enviar correos
    clients.forEach(async (client) => {
      Promise.all([
        this.mailer.sendMail({
          to: client.email,
          subject: 'Vale de atención gratuita de mantenimiento',
          template: './birthday',
          context: {
            name: client.name,
          },
        }),
        this.twilio.sendWhatsapp({
          to: client.phone,
          body: `Hola ${client.name},
            Por ser el día de tu santo te regalamos un vale de
            atencion gratuita de mantenimiento en "CARRANZA MOTORS"`,
        }),
      ]);
    });
  }
}
