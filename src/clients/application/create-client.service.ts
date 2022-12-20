import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { ClientOrm } from 'src/database/domain/client.orm';
import {
  CreateVisitRequest,
  CreateVisitService,
} from 'src/visits/application/create-visit.service';
import { uuid } from 'uuidv4';
import { ClientInterface } from '../domain/client.interface';

@Injectable()
export class CreateClientService {
  constructor(private createVisitService: CreateVisitService) {}

  async execute(
    request: CreateClientRequest,
    transaction: Transaction,
  ): Promise<ClientInterface> {
    const clientOrm = await ClientOrm.create(
      {
        id: uuid(),
        ...request,
      },
      { transaction },
    );
    // crear visita
    request.visit.client = clientOrm;
    const visit = await this.createVisitService.execute(
      request.visit,
      transaction,
    );
    // add visits
    const client = clientOrm.toJSON();
    client.visits = [];
    client.visits.push(visit);
    return client;
  }
}

export interface CreateClientRequest {
  name: string;
  surename: string;
  documentNumber: string;
  email: string;
  dateOfBirth: Date;
  phone?: string;
  visit: CreateVisitRequest;
}
