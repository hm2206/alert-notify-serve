import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaginateClientService } from '../application/paginate-client.service';
import { CreateClientService } from '../application/create-client.service';
import { FindClientService } from '../application/find-client.service';
import { EditClientService } from '../application/edit-client.service';
import { FindClientDto } from './dtos/find-client.dto';
import { CreateClientDto } from './dtos/create-client.dto';
import { EditClientDto } from './dtos/edit-client.dto';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import { SEQUELIZE_SERVICE } from 'src/database/service/sequelize.service';

@ApiTags('Clients')
@Controller('clients')
export class HttpClientController {
  constructor(
    private paginateClientService: PaginateClientService,
    private createClientService: CreateClientService,
    private findClientService: FindClientService,
    private editClientService: EditClientService,
    @Inject(SEQUELIZE_SERVICE)
    private connection: Sequelize,
  ) {}

  @Get()
  async index() {
    return this.paginateClientService.execute();
  }

  @Post()
  async store(@Body() request: CreateClientDto) {
    const transaction = await this.connection.transaction();
    try {
      const client = await this.createClientService.execute(
        request,
        transaction,
      );
      transaction.commit();
      return client;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  @Get(':id')
  async show(@Param() request: FindClientDto) {
    return this.findClientService.execute(request);
  }

  @Put(':id')
  async update(@Param() params: FindClientDto, @Body() payload: EditClientDto) {
    return this.editClientService.execute({ params, payload });
  }
}
