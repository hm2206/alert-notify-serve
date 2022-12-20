import { Injectable } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';
import { FindRoleRequest } from './find-role.service';

@Injectable()
export class EditRoleService {
  async execute({ params, payload }: EditRoleRequest) {
    return RoleOrm.update(payload, {
      where: {
        ...params,
      },
    });
  }
}

export interface EditRolePayload {
  name: string;
}

export interface EditRoleRequest {
  params: FindRoleRequest;
  payload: EditRolePayload;
}
