import { Injectable } from '@nestjs/common';
import { UserOrm } from 'src/database/domain/user.orm';
import { FindUserRequest } from './find-user.service';

@Injectable()
export class EditUserService {
  async execute({ params, payload }: EditUserRequest) {
    return UserOrm.update(payload, {
      where: {
        ...params,
      },
    });
  }
}

export interface EditUserPayload {
  username: string;
  email: string;
  password: string;
  roleId: string;
}

export interface EditUserRequest {
  params: FindUserRequest;
  payload: EditUserPayload;
}
