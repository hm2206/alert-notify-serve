import { Injectable } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';
import { uuid } from 'uuidv4';

@Injectable()
export class CreateRoleService {
  async execute(request: CreateRoleRequest) {
    return RoleOrm.create({
      id: uuid(),
      name: request.name,
    });
  }
}

export interface CreateRoleRequest {
  name: string;
  isRoot: boolean;
}
