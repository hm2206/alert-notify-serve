import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsObject } from 'class-validator';
import { CreatePermissionRequest } from 'src/permissions/application/create-permission.service';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';
import { TermsValues } from 'src/permissions/domain/value-objects/terms.values';

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
  @IsObject()
  terms: TermsValues;
}
