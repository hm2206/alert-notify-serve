import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';
import { PermissionInterface } from 'src/permissions/domain/permission.interface';
import { CaslEntityInterface } from 'src/permissions/domain/casl-entity.interface';
import { RoleOrm } from './role.orm';

@Table({
  modelName: 'permissions',
  indexes: [
    {
      fields: ['entity', 'mode', 'roleId'],
      unique: true,
      name: 'u_permissions',
    },
  ],
})
export class PermissionOrm
  extends Model
  implements PermissionInterface, CaslEntityInterface
{
  __entity__: PermissionEntityEnum = PermissionEntityEnum.PermissionEntity;

  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(Object.values(PermissionEntityEnum) as any),
  })
  entity: PermissionEntityEnum;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(Object.values(PermissionModeEnum) as any),
  })
  mode: PermissionModeEnum;

  @ForeignKey(() => RoleOrm)
  @AllowNull(false)
  @Column({ type: DataType.UUID })
  roleId: string;

  @BelongsTo(() => RoleOrm)
  role: RoleOrm;
}
