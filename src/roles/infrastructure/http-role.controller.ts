import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateRoleRequest,
  CreateRoleService,
} from '../application/create-role.service';
import {
  FindRoleRequest,
  FindRoleService,
} from '../application/find-role.service';
import { PaginateRoleService } from '../application/paginate-role.service';

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
  async show(@Param() request: FindRoleRequest) {
    return this.findRoleService.execute(request);
  }
}
