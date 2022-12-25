import { Module } from '@nestjs/common';
import { HttpRoleController } from './infrastructure/http-role.controller';
import { CreateRoleService } from './application/create-role.service';
import { FindRoleService } from './application/find-role.service';
import { PaginateRoleService } from './application/paginate-role.service';
import { EditRoleService } from './application/edit-role.service';
import { PermissionModule } from 'src/permissions/permission.module';

@Module({
  imports: [PermissionModule],
  providers: [
    CreateRoleService,
    FindRoleService,
    PaginateRoleService,
    EditRoleService,
  ],
  exports: [CreateRoleService],
  controllers: [HttpRoleController],
})
export class RoleModule {}
