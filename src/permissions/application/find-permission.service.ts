import { Injectable } from '@nestjs/common';
import { PermissionOrm } from 'src/database/domain/permission.orm';

@Injectable()
export class FindPermissionService {
  async execute(request: FindPermissionRequest) {
    return PermissionOrm.findOne({
      where: {
        id: request.id,
      },
    });
  }
}

export class FindPermissionRequest {
  id: string;
}
