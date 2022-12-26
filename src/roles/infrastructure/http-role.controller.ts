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
import { CreateRoleService } from '../application/create-role.service';
import { FindRoleService } from '../application/find-role.service';
import { PaginateRoleService } from '../application/paginate-role.service';
import { FindRoleDto } from './dtos/find-role.dto';
import { EditRoleService } from '../application/edit-role.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dtos/create-role.dto';
import { EditRoleDto } from './dtos/edit-role.dto';
import { JwtAuthGuard } from 'src/auth/infrastruture/guards/jwt-auth.guard';
import { CaslGuard } from 'src/permissions/infrastructure/guards/casl.guard';
import { CaslAction } from 'src/permissions/infrastructure/decoratos/casl-action.decorator';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';
import { DeleteRoleService } from '../application/delete-role.service';

@ApiTags('Rol')
@Controller('roles')
export class HttpRoleController {
  constructor(
    private paginateRoleService: PaginateRoleService,
    private createRoleService: CreateRoleService,
    private findRoleService: FindRoleService,
    private editRoleService: EditRoleService,
    private deleteRoleService: DeleteRoleService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.RoleEntity,
    action: PermissionModeEnum.READ,
  })
  async index() {
    return this.paginateRoleService.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.RoleEntity,
    action: PermissionModeEnum.CREATE,
  })
  async store(@Body() request: CreateRoleDto) {
    return this.createRoleService.execute(request);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.RoleEntity,
    action: PermissionModeEnum.READ,
  })
  async show(@Param() request: FindRoleDto) {
    return this.findRoleService.execute(request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.RoleEntity,
    action: PermissionModeEnum.UPDATE,
  })
  async update(@Param() params: FindRoleDto, @Body() payload: EditRoleDto) {
    return this.editRoleService.execute({ params, payload });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.RoleEntity,
    action: PermissionModeEnum.DELETE,
  })
  async delete(@Param() params: FindRoleDto) {
    return this.deleteRoleService.execute(params);
  }
}
