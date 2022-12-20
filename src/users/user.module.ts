import { Module } from '@nestjs/common';
import { HttpUserController } from './infrastructure/http-user.controller';
import { FindUserService } from './application/find-user.service';
import { CreateUserService } from './application/create-user.service';
import { PaginateUserService } from './application/paginate-user.service';
import { EditUserService } from './application/edit-user.service';
import { PermissionModule } from 'src/permissions/permission.module';

@Module({
  imports: [PermissionModule],
  providers: [
    FindUserService,
    CreateUserService,
    PaginateUserService,
    EditUserService,
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
