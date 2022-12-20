import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateRoleRequest,
  CreateRoleService,
} from '../application/create-role.service';
import { FindRoleService } from '../application/find-role.service';
import { PaginateRoleService } from '../application/paginate-role.service';
import { FindRoleDto } from './dtos/find-role.dto';
import {
  EditRolePayload,
  EditRoleService,
} from '../application/edit-role.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rol')
@Controller('roles')
export class HttpRoleController {
  constructor(
    private paginateRoleService: PaginateRoleService,
    private createRoleService: CreateRoleService,
    private findRoleService: FindRoleService,
    private editRoleService: EditRoleService,
  ) {}

  @Get()
  async index() {
    return this.paginateRoleService.execute();
  }

  @Post()
  async store(@Body() request: CreateRoleRequest) {
    return this.createRoleService.execute(request);
  }

  @Get(':id')
  async show(@Param() request: FindRoleDto) {
    return this.findRoleService.execute(request);
  }

  @Put(':id')
  async update(@Param() params: FindRoleDto, @Body() payload: EditRolePayload) {
    return this.editRoleService.execute({ params, payload });
  }
}
