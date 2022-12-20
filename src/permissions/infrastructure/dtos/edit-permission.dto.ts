import { IsDefined, IsEnum, IsObject } from 'class-validator';
import { EditPermissionPayload } from 'src/permissions/application/edit-permission.service';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';
import { TermsValues } from 'src/permissions/domain/value-objects/terms.values';

export class EditPermissionDto implements EditPermissionPayload {
  @IsDefined()
  @IsEnum(PermissionEntityEnum)
  entity: PermissionEntityEnum;

  @IsDefined()
  @IsEnum(PermissionModeEnum)
  mode: PermissionModeEnum;

  @IsDefined()
  @IsObject()
  terms: TermsValues;
}
