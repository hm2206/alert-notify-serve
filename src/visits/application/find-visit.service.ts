import { Injectable } from '@nestjs/common';
import { RoleOrm } from 'src/database/domain/role.orm';

@Injectable()
export class FindVisitService {
  async execute(request: FindVisitRequest) {
    return RoleOrm.findOne({
      where: {
        id: request.id,
      },
    });
  }
}

export class FindVisitRequest {
  id: string;
}
