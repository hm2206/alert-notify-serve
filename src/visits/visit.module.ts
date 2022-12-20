import { Module } from '@nestjs/common';
import { HttpVisitController } from './infrastructure/http-vist.controller';
import { PaginateVisitService } from './application/paginate-visit.service';
import { CreateVisitService } from './application/create-visit.service';
import { FindVisitService } from './application/find-visit.service';
import { EditVisitService } from './application/edit-visit.service';
import { PermissionModule } from 'src/permissions/permission.module';

@Module({
  imports: [PermissionModule],
  providers: [
    PaginateVisitService,
    CreateVisitService,
    FindVisitService,
    EditVisitService,
  ],
  controllers: [HttpVisitController],
  exports: [
    PaginateVisitService,
    CreateVisitService,
    FindVisitService,
    EditVisitService,
  ],
})
export class VisitModule {}
