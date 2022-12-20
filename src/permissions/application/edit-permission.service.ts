import { Injectable } from '@nestjs/common';
import { FindPermissionRequest } from './find-permission.service';
import { PermissionOrm } from 'src/database/domain/permission.orm';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from '../domain/permission.enum';
import { TermsValues } from '../domain/value-objects/terms.values';

@Injectable()
export class EditPermissionService {
  async execute({ params, payload }: EditPermissionRequest) {
    const data = await PermissionOrm.findOne({
      where: { ...params },
    });

    data.set(payload);
    return await data.save();
  }
}

export interface EditPermissionPayload {
  entity: PermissionEntityEnum;
  mode: PermissionModeEnum;
  terms: TermsValues;
}

export interface EditPermissionRequest {
  params: FindPermissionRequest;
  payload: EditPermissionPayload;
}
