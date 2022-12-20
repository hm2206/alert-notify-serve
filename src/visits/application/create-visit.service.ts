import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { ClientInterface } from 'src/clients/domain/client.interface';
import { VisitOrm } from 'src/database/domain/visit.orm';
import { uuid } from 'uuidv4';

@Injectable()
export class CreateVisitService {
  async execute(request: CreateVisitRequest, transaction?: Transaction) {
    return VisitOrm.create(
      {
        id: uuid(),
        date: request.date,
        clientId: request.client.id,
      },
      { transaction },
    );
  }
}

export interface CreateVisitRequest {
  date: Date;
  client: ClientInterface;
}
