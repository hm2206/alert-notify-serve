import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FindVisitDto } from './dtos/find-visit.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateVisitDto } from './dtos/create-visit.dto';
import { EditVisitDto } from './dtos/edit-visit.dto';
import { PaginateVisitService } from '../application/paginate-visit.service';
import { CreateVisitService } from '../application/create-visit.service';
import { FindVisitService } from '../application/find-visit.service';
import { EditVisitService } from '../application/edit-visit.service';
import { ClientOrm } from 'src/database/domain/client.orm';

@ApiTags('Rol')
@Controller('roles')
export class HttpVisitController {
  constructor(
    private paginateVisitService: PaginateVisitService,
    private createVisitService: CreateVisitService,
    private findVisitService: FindVisitService,
    private editVisitService: EditVisitService,
  ) {}

  @Get()
  async index() {
    return this.paginateVisitService.execute();
  }

  @Post()
  async store(@Body() request: CreateVisitDto) {
    const client = await ClientOrm.findOne({ where: { id: request.clientId } });
    request.client = client;
    return this.createVisitService.execute(request);
  }

  @Get(':id')
  async show(@Param() request: FindVisitDto) {
    return this.findVisitService.execute(request);
  }

  @Put(':id')
  async update(@Param() params: FindVisitDto, @Body() payload: EditVisitDto) {
    return this.editVisitService.execute({ params, payload });
  }
}
