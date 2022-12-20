import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsUUID } from 'class-validator';
import { CreatePermissionRequest } from 'src/permissions/application/create-permission.service';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';

export class CreatePermissionDto implements CreatePermissionRequest {
  @ApiProperty()
  @IsDefined()
  @IsEnum(PermissionEntityEnum)
  entity: PermissionEntityEnum;

  @ApiProperty()
  @IsDefined()
  @IsEnum(PermissionModeEnum)
  mode: PermissionModeEnum;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  roleId: string;
}
