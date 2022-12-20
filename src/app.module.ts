import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './roles/role.module';
import { UserModule } from './users/user.module';
import { PermissionModule } from './permissions/permission.module';
import { ClientModule } from './clients/client.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    DatabaseModule,
    RoleModule,
    UserModule,
    PermissionModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
