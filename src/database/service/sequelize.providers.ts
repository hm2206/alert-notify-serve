import { RoleOrm } from '../domain/role.orm';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';

export const sequelizeProviders = [
  {
    provide: ROLE_REPOSITORY,
    useValue: RoleOrm,
  },
];
