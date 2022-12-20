import { Injectable } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';

@Injectable()
export class FindRoleService {
  async execute(request: FindRoleRequest) {
    return RoleOrm.findOne({
      where: {
        id: request.id,
      },
    });
  }
}

export class FindRoleRequest {
  id: string;
}
