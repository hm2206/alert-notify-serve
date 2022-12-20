import { Injectable } from '@nestjs/common';
import { FindPermissionRequest } from './find-permission.service';
import { PermissionOrm } from 'src/database/domain/permission.orm';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from '../domain/permission.enum';

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
  roleId: string;
}

export interface EditPermissionRequest {
  params: FindPermissionRequest;
  payload: EditPermissionPayload;
}
