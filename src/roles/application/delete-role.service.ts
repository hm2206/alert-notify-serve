import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';
import { FindRoleRequest } from './find-role.service';

@Injectable()
export class DeleteRoleService {
  async execute(request: FindRoleRequest) {
    const role = await RoleOrm.findOne({
      where: {
        id: request.id,
      },
    });
    // validar
    if (!role) throw new NotFoundException();
    // response
    return await role.destroy();
  }
}
