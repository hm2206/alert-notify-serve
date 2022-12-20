import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserService } from '../application/create-user.service';
import { PaginateUserService } from '../application/paginate-user.service';
import { FindUserService } from '../application/find-user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user-dto';
import {
  EditUserPayload,
  EditUserService,
} from '../application/edit-user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class HttpUserController {
  constructor(
    private paginateUserService: PaginateUserService,
    private createUserService: CreateUserService,
    private findUserService: FindUserService,
    private editUserService: EditUserService,
  ) {}

  @Get()
  async index() {
    return this.paginateUserService.execute();
  }

  @Post()
  async store(@Body() request: CreateUserDto) {
    return this.createUserService.execute(request);
  }

  @Get(':id')
  async show(@Param() request: FindUserDto) {
    return this.findUserService.execute(request);
  }

  @Put(':id')
  async update(@Param() params: FindUserDto, @Body() payload: EditUserPayload) {
    return this.editUserService.execute({ params, payload });
  }
}
