import { Injectable } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';
import { FindRoleRequest } from './find-role.service';

@Injectable()
export class FindRoleService {
  async execute(request: FindRoleRequest) {
    return RoleOrm.findOne({
      where: {
        id: request.id,
      },
      include: ['permissions'],
    });
  }
}
