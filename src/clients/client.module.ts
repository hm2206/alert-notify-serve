import { Module } from '@nestjs/common';
import { FindClientService } from './application/find-client.service';
import { PaginateClientService } from './application/paginate-client.service';
import { CreateClientService } from './application/create-client.service';
import { EditClientService } from './application/edit-client.service';
import { HttpClientController } from './infrastructure/http-client.controller';
import { DatabaseModule } from 'src/database/database.module';
import { VisitModule } from 'src/visits/visit.module';

@Module({
  imports: [DatabaseModule, VisitModule],
  providers: [
    PaginateClientService,
    CreateClientService,
    FindClientService,
    EditClientService,
  ],
  controllers: [HttpClientController],
})
export class ClientModule {}
