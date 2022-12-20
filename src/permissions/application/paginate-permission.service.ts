import { Injectable } from '@nestjs/common';
import { PermissionOrm } from 'src/database/domain/permission.orm';

@Injectable()
export class PaginatePermissionService {
  async execute() {
    return PermissionOrm.findAll();
  }
}
