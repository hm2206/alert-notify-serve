import { Injectable } from '@nestjs/common';
import { PermissionOrm } from 'src/database/domain/permission.orm';
import { FindPermissionRequest } from './find-permission.service';

@Injectable()
export class DeletePermissionService {
  async execute(request: FindPermissionRequest) {
    const permission = await PermissionOrm.findOne({
      where: {
        id: request.id,
      },
    });
    // eliminar
    await permission.destroy();
    return { deleted: true };
  }
}
