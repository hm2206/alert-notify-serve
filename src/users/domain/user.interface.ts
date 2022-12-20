import { RoleInterface } from 'src/roles/domain/role.interface';

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  password: string;
  roleId: string;
  role: RoleInterface;
}
