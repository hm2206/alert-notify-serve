import { Module } from '@nestjs/common';
import { SequelizeService } from './service/sequelize.service';
import { sequelizeProviders } from './service/sequelize.providers';

@Module({
  providers: [SequelizeService, ...sequelizeProviders],
  exports: [SequelizeService, ...sequelizeProviders],
})
export class DatabaseModule {}
