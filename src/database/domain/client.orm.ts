import { CaslEntityInterface } from 'src/permissions/domain/casl-entity.interface';
import { PermissionEntityEnum } from '../../permissions/domain/permission.enum';
import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ClientInterface } from 'src/clients/domain/client.interface';
import { VisitInterface } from 'src/visits/domain/visit.interface';
import { VisitOrm } from './visit.orm';

@Table({ modelName: 'clients' })
export class ClientOrm
  extends Model
  implements ClientInterface, CaslEntityInterface
{
  __entity__ = PermissionEntityEnum.ClientEntity;

  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(40) })
  name: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(100) })
  surename: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(20), unique: true })
  documentNumber: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(100) })
  email: string;

  @AllowNull(false)
  @Column({ type: DataType.DATEONLY })
  dateOfBirth: Date;

  @Column({ type: DataType.STRING(20) })
  phone?: string;

  @HasMany(() => VisitOrm, { onDelete: 'cascade' })
  visits: VisitInterface[] = [];
  countVisits = 0;
}
