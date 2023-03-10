import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './roles/role.module';
import { UserModule } from './users/user.module';
import { PermissionModule } from './permissions/permission.module';
import { ClientModule } from './clients/client.module';
import { VisitModule } from './visits/visit.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    RoleModule,
    UserModule,
    PermissionModule,
    ClientModule,
    VisitModule,
    AuthModule,
  ],
})
export class AppModule {}
