import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Transaction } from 'sequelize';
import { ClientInterface } from 'src/clients/domain/client.interface';
import { VisitOrm } from 'src/database/domain/visit.orm';
import { uuid } from 'uuidv4';
import {
  CreatedVisitRequest,
  createdVisitEventName,
} from '../events/created-visit.event';

@Injectable()
export class CreateVisitService {
  constructor(private eventEmitter: EventEmitter2) {}

  async execute(request: CreateVisitRequest, transaction?: Transaction) {
    // validar visistas
    const numVisit = await VisitOrm.count({
      where: { clientId: request.client.id },
    });
    // validar is send
    const isSend = (numVisit + 1) % 3 === 0;
    // crear visitas
    const visit = await VisitOrm.create(
      {
        id: uuid(),
        date: request.date,
        clientId: request.client.id,
        isSend,
      },
      { transaction },
    );
    // emitir evento
    await this.eventEmitter.emitAsync(createdVisitEventName, {
      visit,
      client: request.client,
    } as CreatedVisitRequest);
    // response visis
    return visit;
  }
}

export interface CreateVisitRequest {
  date: Date;
  client: ClientInterface;
}
