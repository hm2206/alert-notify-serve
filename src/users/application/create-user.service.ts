import { Injectable } from '@nestjs/common';
import { UserOrm } from 'src/database/domain/user.orm';
import { uuid } from 'uuidv4';
import { PasswordUserValue } from '../domain/value-objects/password-user.value';

@Injectable()
export class CreateUserService {
  async execute(request: CreateUserRequest) {
    return UserOrm.create({
      id: uuid(),
      username: request.username,
      email: request.email,
      password: await new PasswordUserValue(request.password).generate(),
      roleId: request.roleId,
    });
  }
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  roleId: string;
}
