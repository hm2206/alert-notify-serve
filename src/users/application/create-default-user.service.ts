import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleService } from 'src/roles/application/create-role.service';
import { CreateUserService } from './create-user.service';
import { Sequelize } from 'sequelize';
import { SEQUELIZE_SERVICE } from 'src/database/service/sequelize.service';

@Injectable()
export class CreateDefaultUserService {
  constructor(
    @Inject(SEQUELIZE_SERVICE)
    private connection: Sequelize,
    private createRoleService: CreateRoleService,
    private createUserService: CreateUserService,
  ) {}

  async execute(request: CreateDefaultUserRequest) {
    const transaction = await this.connection.transaction();

    try {
      const role = await this.createRoleService.execute({
        name: 'Admin',
        isRoot: true,
      });

      const user = await this.createUserService.execute({
        username: '@admin',
        email: 'admin@gmail.com',
        password: request.password,
        roleId: role.id,
      });

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export interface CreateDefaultUserRequest {
  password: string;
}
