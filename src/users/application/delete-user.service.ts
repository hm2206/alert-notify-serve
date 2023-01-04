import { Injectable, NotFoundException } from '@nestjs/common';
import { UserOrm } from 'src/database/domain/user.orm';
import { FindUserRequest } from './find-user.service';

@Injectable()
export class DeleteUserService {
  async execute(request: FindUserRequest) {
    const user = await UserOrm.findOne({
      where: {
        id: request.id,
      },
      include: ['role'],
    });

    if (!user) throw new NotFoundException();

    await user.destroy();
    return { deleted: true };
  }
}
