import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PaginateClientService } from '../application/paginate-client.service';
import { CreateClientService } from '../application/create-client.service';
import { FindClientService } from '../application/find-client.service';
import { EditClientService } from '../application/edit-client.service';
import { FindClientDto } from './dtos/find-client.dto';
import { CreateClientDto } from './dtos/create-client.dto';
import { EditClientDto } from './dtos/edit-client.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class HttpClientController {
  constructor(
    private paginateClientService: PaginateClientService,
    private createClientService: CreateClientService,
    private findClientService: FindClientService,
    private editClientService: EditClientService,
  ) {}

  @Get()
  async index() {
    return this.paginateClientService.execute();
  }

  @Post()
  async store(@Body() request: CreateClientDto) {
    return this.createClientService.execute(request);
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
