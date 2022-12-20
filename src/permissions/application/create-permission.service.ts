import { Injectable } from '@nestjs/common';
import { PermissionOrm } from 'src/database/domain/permission.orm';
import { uuid } from 'uuidv4';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from '../domain/permission.enum';
import { TermsValues } from '../domain/value-objects/terms.values';

@Injectable()
export class CreatePermissionService {
  async execute(request: CreatePermissionRequest) {
    return PermissionOrm.create({
      id: uuid(),
      entity: request.entity,
      mode: request.mode,
      terms: request.terms,
    });
  }
}

export interface CreatePermissionRequest {
  entity: PermissionEntityEnum;
  mode: PermissionModeEnum;
  terms: TermsValues;
}
