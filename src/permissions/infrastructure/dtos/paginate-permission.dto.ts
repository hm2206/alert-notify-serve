import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginatePermissionRequest } from 'src/permissions/application/paginate-permission.service';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';

export class PaginatePermissionDto implements PaginatePermissionRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(PermissionEntityEnum, { each: true })
  entities?: PermissionEntityEnum[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(PermissionModeEnum, { each: true })
  modes?: PermissionModeEnum[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4, { each: true })
  roleIds?: string[];
}
