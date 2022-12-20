import { Injectable } from '@nestjs/common';
import { UserOrm } from 'src/database/domain/user.orm';
import { FindUserRequest } from './find-user.service';
import { PasswordUserValue } from '../domain/value-objects/password-user.value';

@Injectable()
export class EditUserService {
  async execute({ params, payload }: EditUserRequest) {
    const data = await UserOrm.findOne({ where: { ...params } });
    // validar contraseña
    if (payload.password != data.password) {
      const password = new PasswordUserValue(payload.password);
      payload.password = await password.generate();
    }

    data.set(payload);
    return data.save();
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
