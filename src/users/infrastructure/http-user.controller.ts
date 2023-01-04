import {
  Body,
  Controller,
  Delete,
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
import { EditUserService } from '../application/edit-user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infrastruture/guards/jwt-auth.guard';
import { CaslGuard } from 'src/permissions/infrastructure/guards/casl.guard';
import { CaslAction } from 'src/permissions/infrastructure/decoratos/casl-action.decorator';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';
import { EditUserDto } from './dtos/edit-user.dto';
import { CreateDefaultUserService } from '../application/create-default-user.service';
import { CreateDefaultUserDto } from './dtos/create-default-user.dto';
import { DeleteUserService } from '../application/delete-user.service';

@ApiTags('Users')
@Controller('users')
export class HttpUserController {
  constructor(
    private paginateUserService: PaginateUserService,
    private createUserService: CreateUserService,
    private findUserService: FindUserService,
    private editUserService: EditUserService,
    private deleteUserService: DeleteUserService,
    private createDefaultService: CreateDefaultUserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.UserEntity,
    action: PermissionModeEnum.READ,
  })
  async index() {
    return this.paginateUserService.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.UserEntity,
    action: PermissionModeEnum.CREATE,
  })
  async store(@Body() request: CreateUserDto) {
    return this.createUserService.execute(request);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.UserEntity,
    action: PermissionModeEnum.READ,
  })
  async show(@Param() request: FindUserDto) {
    return this.findUserService.execute(request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.UserEntity,
    action: PermissionModeEnum.UPDATE,
  })
  async update(@Param() params: FindUserDto, @Body() payload: EditUserDto) {
    return this.editUserService.execute({ params, payload });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.UserEntity,
    action: PermissionModeEnum.DELETE,
  })
  async delete(@Param() params: FindUserDto) {
    return this.deleteUserService.execute(params);
  }

  @Post('default/install')
  async default(@Body() payload: CreateDefaultUserDto) {
    return this.createDefaultService.execute(payload);
  }
}
