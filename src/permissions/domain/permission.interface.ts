import { RoleInterface } from 'src/roles/domain/role.interface';
import { PermissionEntityEnum, PermissionModeEnum } from './permission.enum';

export interface PermissionInterface {
  id: string;
  entity: PermissionEntityEnum;
  mode: PermissionModeEnum;
  role: RoleInterface;
}
