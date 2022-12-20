import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleService } from '../application/create-role.service';
import { FindRoleService } from '../application/find-role.service';
import { PaginateRoleService } from '../application/paginate-role.service';
import { FindRoleDto } from './dtos/find-role.dto';
import { EditRoleService } from '../application/edit-role.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dtos/create-role.dto';
import { EditRoleDto } from './dtos/edit-role.dto';
import { JwtAuthGuard } from 'src/auth/infrastruture/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async index() {
    return this.paginateRoleService.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async store(@Body() request: CreateRoleDto) {
    return this.createRoleService.execute(request);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async show(@Param() request: FindRoleDto) {
    return this.findRoleService.execute(request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param() params: FindRoleDto, @Body() payload: EditRoleDto) {
    return this.editRoleService.execute({ params, payload });
  }
}
