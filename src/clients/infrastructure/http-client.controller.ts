import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaginateClientService } from '../application/paginate-client.service';
import { CreateClientService } from '../application/create-client.service';
import { FindClientService } from '../application/find-client.service';
import { EditClientService } from '../application/edit-client.service';
import { FindClientDto } from './dtos/find-client.dto';
import { CreateClientDto } from './dtos/create-client.dto';
import { EditClientDto } from './dtos/edit-client.dto';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import { SEQUELIZE_SERVICE } from 'src/database/service/sequelize.service';
import { JwtAuthGuard } from 'src/auth/infrastruture/guards/jwt-auth.guard';
import { CaslGuard } from 'src/permissions/infrastructure/guards/casl.guard';
import { CaslAction } from 'src/permissions/infrastructure/decoratos/casl-action.decorator';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';
import { DeleteClientService } from '../application/delete-client.service';

@ApiTags('Clients')
@Controller('clients')
export class HttpClientController {
  constructor(
    private paginateClientService: PaginateClientService,
    private createClientService: CreateClientService,
    private findClientService: FindClientService,
    private editClientService: EditClientService,
    private deleteClientService: DeleteClientService,
    @Inject(SEQUELIZE_SERVICE)
    private connection: Sequelize,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.ClientEntity,
    action: PermissionModeEnum.READ,
  })
  async index() {
    return this.paginateClientService.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.ClientEntity,
    action: PermissionModeEnum.CREATE,
  })
  async store(@Body() request: CreateClientDto) {
    const transaction = await this.connection.transaction();
    try {
      const client = await this.createClientService.execute(
        request,
        transaction,
      );
      transaction.commit();
      return client;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.ClientEntity,
    action: PermissionModeEnum.READ,
  })
  async show(@Param() request: FindClientDto) {
    return this.findClientService.execute(request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.ClientEntity,
    action: PermissionModeEnum.UPDATE,
  })
  async update(@Param() params: FindClientDto, @Body() payload: EditClientDto) {
    return this.editClientService.execute({ params, payload });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CaslAction({
    entity: PermissionEntityEnum.ClientEntity,
    action: PermissionModeEnum.DELETE,
  })
  async delete(@Param() params: FindClientDto) {
    return this.deleteClientService.execute(params);
  }
}
