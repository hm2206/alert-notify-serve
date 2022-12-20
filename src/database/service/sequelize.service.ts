import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { UserOrm } from '../domain/user.orm';
import { RoleOrm } from '../domain/role.orm';
import { PermissionOrm } from '../domain/permission.orm';
import { ClientOrm } from '../domain/client.orm';
import { VisitOrm } from '../domain/visit.orm';

export const SEQUELIZE_SERVICE = 'SequelizeService';

export const SequelizeService = {
  provide: SEQUELIZE_SERVICE,
  useFactory: async (config: ConfigService) => {
    const sequelize = new Sequelize({
      dialect: config.get('DB_TYPE'),
      host: config.get('DB_HOST'),
      port: config.get('DB_PORT'),
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
    });
    // add models
    sequelize.addModels([RoleOrm, PermissionOrm, UserOrm, ClientOrm, VisitOrm]);
    await sequelize.sync();
    return sequelize;
  },
  inject: [ConfigService],
  imports: [ConfigModule],
};
