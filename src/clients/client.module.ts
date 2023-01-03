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
import { MailModule } from 'src/mails/mail.module';
import { DailyClientTask } from './application/tasks/daily-client.task';

@Module({
  imports: [DatabaseModule, VisitModule, PermissionModule, MailModule],
  providers: [
    PaginateClientService,
    CreateClientService,
    FindClientService,
    EditClientService,
    DeleteClientService,
    DailyClientTask,
  ],
  controllers: [HttpClientController],
})
export class ClientModule {}
