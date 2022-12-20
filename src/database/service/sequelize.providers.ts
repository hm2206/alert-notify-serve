import { RoleOrm } from '../domain/role.orm';
import { UserOrm } from '../domain/user.orm';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
export const USER_REPOSITORY = 'USER_REPOSITORY';

export const sequelizeProviders = [
  {
    provide: ROLE_REPOSITORY,
    useValue: RoleOrm,
  },
  {
    provide: USER_REPOSITORY,
    useValue: UserOrm,
  },
];
