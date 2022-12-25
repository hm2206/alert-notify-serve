import { Module } from '@nestjs/common';
import { HttpUserController } from './infrastructure/http-user.controller';
import { FindUserService } from './application/find-user.service';
import { CreateUserService } from './application/create-user.service';
import { PaginateUserService } from './application/paginate-user.service';
import { EditUserService } from './application/edit-user.service';
import { PermissionModule } from 'src/permissions/permission.module';
import { CreateDefaultUserService } from './application/create-default-user.service';
import { RoleModule } from 'src/roles/role.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, PermissionModule, RoleModule],
  providers: [
    FindUserService,
    CreateUserService,
    PaginateUserService,
    EditUserService,
    CreateDefaultUserService,
  ],
  controllers: [HttpUserController],
  exports: [
    FindUserService,
    CreateUserService,
    PaginateUserService,
    EditUserService,
  ],
})
export class UserModule {}
