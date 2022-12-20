import { PermissionEntityEnum, PermissionModeEnum } from './permission.enum';

export interface PermissionInterface {
  id: string;
  entity: PermissionEntityEnum;
  mode: PermissionModeEnum;
  terms: any;
}
