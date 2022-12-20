import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PermissionEntityEnum } from 'src/permissions/domain/permission.enum';
import { CaslEntityInterface } from 'src/permissions/domain/casl-entity.interface';
import { ClientOrm } from './client.orm';

@Table({ modelName: 'visits' })
export class VisitOrm extends Model implements CaslEntityInterface {
  __entity__: PermissionEntityEnum = PermissionEntityEnum.VisitEntity;

  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @ForeignKey(() => ClientOrm)
  @Column({ type: DataType.UUID })
  clientId: string;

  @BelongsTo(() => ClientOrm)
  client: ClientOrm;
}
