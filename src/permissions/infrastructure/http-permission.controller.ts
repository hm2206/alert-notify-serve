import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginatePermissionService } from '../application/paginate-permission.service';
import { CreatePermissionService } from '../application/create-permission.service';
import { FindPermissionService } from '../application/find-permission.service';
import { EditPermissionService } from '../application/edit-permission.service';
import { FindPermissionDto } from './dtos/find-permission.dto';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { EditPermissionDto } from './dtos/edit-permission.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infrastruture/guards/jwt-auth.guard';
import { CaslGuard } from './guards/casl.guard';
import { CaslAction } from './decoratos/casl-action.decorator';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from '../domain/permission.enum';
import { PaginatePermissionDto } from './dtos/paginate-permission.dto';
import { DeletePermissionService } from '../application/delete-permission.service';

@ApiTags('Permissions')
@Controller('permissions')
export class HttpPermissionController {
  constructor(
    private paginatePermissionService: PaginatePermissionService,
    private createPermissionService: CreatePermissionService,
    private findPermissionService: FindPermissionService,
    private editPermissionService: EditPermissionService,
    private deletePermissionService: DeletePermissionService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.PermissionEntity,
    action: PermissionModeEnum.READ,
  })
  async index(@Query() request: PaginatePermissionDto) {
    return this.paginatePermissionService.execute(request);
  }

  @Post()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.PermissionEntity,
    action: PermissionModeEnum.CREATE,
  })
  async store(@Body() request: CreatePermissionDto) {
    return this.createPermissionService.execute(request);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.PermissionEntity,
    action: PermissionModeEnum.READ,
  })
  async show(@Param() request: FindPermissionDto) {
    return this.findPermissionService.execute(request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.PermissionEntity,
    action: PermissionModeEnum.UPDATE,
  })
  async update(
    @Param() params: FindPermissionDto,
    @Body() payload: EditPermissionDto,
  ) {
    return this.editPermissionService.execute({ params, payload });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.PermissionEntity,
    action: PermissionModeEnum.DELETE,
  })
  async delete(@Param() params: FindPermissionDto) {
    return this.deletePermissionService.execute(params);
  }
}
