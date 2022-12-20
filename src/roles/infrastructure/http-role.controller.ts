import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateRoleRequest,
  CreateRoleService,
} from '../application/create-role.service';
import { FindRoleService } from '../application/find-role.service';
import { PaginateRoleService } from '../application/paginate-role.service';
import { FindRoleDto } from './dtos/find-role.dto';

@Controller('roles')
export class HttpRoleController {
  constructor(
    private paginateRoleService: PaginateRoleService,
    private createRoleService: CreateRoleService,
    private findRoleService: FindRoleService,
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
}
