import { Injectable } from '@nestjs/common';
import { ClientOrm } from 'src/database/domain/client.orm';
import { uuid } from 'uuidv4';

@Injectable()
export class CreateClientService {
  async execute(request: CreateClientRequest) {
    return ClientOrm.create({
      id: uuid(),
      ...request,
    });
  }
}

export interface CreateClientRequest {
  name: string;
  surename: string;
  documentNumber: string;
  email: string;
  dateOfBirth: Date;
  phone?: string;
}
