import { Module } from '@nestjs/common';
import { FindClientService } from './application/find-client.service';
import { PaginateClientService } from './application/paginate-client.service';
import { CreateClientService } from './application/create-client.service';
import { EditClientService } from './application/edit-client.service';
import { HttpClientController } from './infrastructure/http-client.controller';
import { DatabaseModule } from 'src/database/database.module';
import { VisitModule } from 'src/visits/visit.module';
import { PermissionModule } from 'src/permissions/permission.module';
import { DeleteClientService } from './application/delete-client.service';

@Module({
  imports: [DatabaseModule, VisitModule, PermissionModule],
  providers: [
    PaginateClientService,
    CreateClientService,
    FindClientService,
    EditClientService,
    DeleteClientService,
  ],
  controllers: [HttpClientController],
})
export class ClientModule {}
