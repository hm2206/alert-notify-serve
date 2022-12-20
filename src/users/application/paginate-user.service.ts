import { Injectable } from '@nestjs/common';
import { UserOrm } from 'src/database/domain/user.orm';

@Injectable()
export class PaginateUserService {
  async execute() {
    return UserOrm.findAll();
  }
}
