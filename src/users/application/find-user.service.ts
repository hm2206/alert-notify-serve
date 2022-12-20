import { Injectable } from '@nestjs/common';
import { UserOrm } from 'src/database/domain/user.orm';

@Injectable()
export class FindUserService {
  async execute(request: FindUserRequest) {
    return UserOrm.findOne({
      where: {
        id: request.id,
      },
      include: ['role'],
    });
  }
}

export class FindUserRequest {
  id: string;
}
