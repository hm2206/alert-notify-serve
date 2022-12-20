import { Injectable } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';
import { FindVisitRequest } from './find-visit.service';

@Injectable()
export class EditVisitService {
  async execute({ params, payload }: EditVisitRequest) {
    const data = await RoleOrm.findOne({ where: { ...params } });
    data.set(payload);
    return data.save();
  }
}

export interface EditVisitPayload {
  date: Date;
}

export interface EditVisitRequest {
  params: FindVisitRequest;
  payload: EditVisitPayload;
}
