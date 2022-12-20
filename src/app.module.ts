import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './roles/role.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    DatabaseModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
