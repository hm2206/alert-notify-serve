import { Injectable } from '@nestjs/common';
import { PermissionOrm } from 'src/database/domain/permission.orm';
import { uuid } from 'uuidv4';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from '../domain/permission.enum';

@Injectable()
export class CreatePermissionService {
  async execute(request: CreatePermissionRequest) {
    return PermissionOrm.create({
      id: uuid(),
      entity: request.entity,
      mode: request.mode,
      roleId: request.roleId,
    });
  }
}

export interface CreatePermissionRequest {
  entity: PermissionEntityEnum;
  mode: PermissionModeEnum;
  roleId: string;
}
