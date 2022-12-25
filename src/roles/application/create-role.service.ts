import { Injectable } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';
import { uuid } from 'uuidv4';
import { Transaction } from 'sequelize';

@Injectable()
export class CreateRoleService {
  async execute(request: CreateRoleRequest, transaction?: Transaction) {
    return RoleOrm.create(
      {
        id: uuid(),
        name: request.name,
        isRoot: request.isRoot,
      },
      { transaction },
    );
  }
}

export interface CreateRoleRequest {
  name: string;
  isRoot: boolean;
}
