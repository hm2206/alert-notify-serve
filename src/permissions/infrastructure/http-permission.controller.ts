import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PaginatePermissionService } from '../application/paginate-permission.service';
import { CreatePermissionService } from '../application/create-permission.service';
import { FindPermissionService } from '../application/find-permission.service';
import { EditPermissionService } from '../application/edit-permission.service';
import { FindPermissionDto } from './dtos/find-permission.dto';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { EditPermissionDto } from './dtos/edit-permission.dto';

@Controller('permissions')
export class HttpPermissionController {
  constructor(
    private paginatePermissionService: PaginatePermissionService,
    private createPermissionService: CreatePermissionService,
    private findPermissionService: FindPermissionService,
    private editPermissionService: EditPermissionService,
  ) {}

  @Get()
  async index() {
    return this.paginatePermissionService.execute();
  }

  @Post()
  async store(@Body() request: CreatePermissionDto) {
    return this.createPermissionService.execute(request);
  }

  @Get(':id')
  async show(@Param() request: FindPermissionDto) {
    return this.findPermissionService.execute(request);
  }

  @Put(':id')
  async update(
    @Param() params: FindPermissionDto,
    @Body() payload: EditPermissionDto,
  ) {
    return this.editPermissionService.execute({ params, payload });
  }
}
