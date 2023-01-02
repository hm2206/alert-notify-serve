import { Module } from '@nestjs/common';
import { PaginatePermissionService } from './application/paginate-permission.service';
import { FindPermissionService } from './application/find-permission.service';
import { CreatePermissionService } from './application/create-permission.service';
import { EditPermissionService } from './application/edit-permission.service';
import { HttpPermissionController } from './infrastructure/http-permission.controller';
import { CaslPermissionService } from './application/casl-permission.service';
import { DeletePermissionService } from './application/delete-permission.service';

@Module({
  providers: [
    PaginatePermissionService,
    FindPermissionService,
    CreatePermissionService,
    EditPermissionService,
    CaslPermissionService,
    DeletePermissionService,
  ],
  exports: [
    PaginatePermissionService,
    FindPermissionService,
    CreatePermissionService,
    EditPermissionService,
    CaslPermissionService,
    DeletePermissionService,
  ],
  controllers: [HttpPermissionController],
})
export class PermissionModule {}
