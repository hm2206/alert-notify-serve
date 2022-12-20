import { Injectable } from '@nestjs/common';
import { FindClientRequest } from './find-client.service';
import { ClientOrm } from 'src/database/domain/client.orm';

@Injectable()
export class EditClientService {
  async execute({ params, payload }: EditClientRequest) {
    const data = await ClientOrm.findOne({
      where: {
        ...params,
      },
    });

    data.set(payload);
    return data.save();
  }
}

export interface EditClientPayload {
  name: string;
  surename: string;
  documentNumber: string;
  email: string;
  dateOfBirth: Date;
  phone?: string;
}

export interface EditClientRequest {
  params: FindClientRequest;
  payload: EditClientPayload;
}
