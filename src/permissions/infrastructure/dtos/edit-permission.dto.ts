import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsUUID } from 'class-validator';
import { EditPermissionPayload } from 'src/permissions/application/edit-permission.service';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';

export class EditPermissionDto implements EditPermissionPayload {
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
