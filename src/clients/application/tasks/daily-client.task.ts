import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import sequelize, { Op } from 'sequelize';
import { ClientOrm } from 'src/database/domain/client.orm';

@Injectable()
export class DailyClientTask {
  constructor(private mailer: MailerService) {}

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
      await this.mailer
        .sendMail({
          to: client.email,
          subject: 'Vale de atencion gratuita de mantenimiento',
          template: './birthday',
          context: {
            name: client.name,
          },
        })
        .catch(() => null);
    });
  }
}
