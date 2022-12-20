import { Injectable } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';

@Injectable()
export class PaginateRoleService {
  async execute() {
    return RoleOrm.findAll();
  }
}
