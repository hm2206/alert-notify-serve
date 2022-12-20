import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';
import { RoleInterface } from 'src/roles/domain/role.interface';
import { UserOrm } from './user.orm';
import { CaslEntityInterface } from 'src/permissions/domain/casl-entity.interface';
import { PermissionEntityEnum } from 'src/permissions/domain/permission.enum';
import { PermissionOrm } from './permission.orm';

@Table({ modelName: 'roles' })
export class RoleOrm
  extends Model
  implements RoleInterface, CaslEntityInterface
{
  __entity__: PermissionEntityEnum.RoleEntity;

  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @AllowNull(false)
  @Column({ unique: true })
  name: string;

  @AllowNull(false)
  @Column
  isRoot: boolean;

  @HasMany(() => UserOrm)
  users: UserOrm[];

  @HasMany(() => PermissionOrm)
  permissions: PermissionOrm[];
}
