import { IsDefined, IsUUID } from 'class-validator';
import { FindPermissionRequest } from 'src/permissions/application/find-permission.service';

export class FindPermissionDto implements FindPermissionRequest {
  @IsDefined()
  @IsUUID(4)
  id: string;
}
