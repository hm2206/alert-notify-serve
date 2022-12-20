import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
import { JwtAuthGuard } from 'src/auth/infrastruture/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async index() {
    return this.paginateUserService.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async store(@Body() request: CreateUserDto) {
    return this.createUserService.execute(request);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async show(@Param() request: FindUserDto) {
    return this.findUserService.execute(request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param() params: FindUserDto, @Body() payload: EditUserPayload) {
    return this.editUserService.execute({ params, payload });
  }
}
