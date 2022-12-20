import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Op } from 'sequelize';
import { UserOrm } from 'src/database/domain/user.orm';
import { PasswordUserValue } from 'src/users/domain/value-objects/password-user.value';

@Injectable()
export class ValidateAuthService {
  async execute(request: ValidateAuthRequest) {
    const user = await UserOrm.findOne({
      where: {
        [Op.or]: [{ username: request.username }, { email: request.username }],
      },
    });

    if (!user) throw new UnauthorizedException();

    const password = new PasswordUserValue(request.password);
    const isEqual = await password.compare(user.password);

    if (!isEqual) throw new UnauthorizedException();

    return user;
  }
}

export interface ValidateAuthRequest {
  username: string;
  password: string;
}
