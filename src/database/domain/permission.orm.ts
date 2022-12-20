import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from 'src/permissions/domain/permission.enum';
import { PermissionInterface } from 'src/permissions/domain/permission.interface';
import { CaslEntityInterface } from 'src/permissions/domain/casl-entity.interface';

@Table({ modelName: 'permissions' })
export class PermissionOrm
  extends Model
  implements PermissionInterface, CaslEntityInterface
{
  __entity__: PermissionEntityEnum = PermissionEntityEnum.PermissionEntity;

  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @Column({
    type: DataType.ENUM(Object.values(PermissionEntityEnum) as any),
  })
  entity: PermissionEntityEnum;

  @Column({
    type: DataType.ENUM(Object.values(PermissionModeEnum) as any),
  })
  mode: PermissionModeEnum;

  @Column({ type: DataType.JSON })
  terms: any;
}
