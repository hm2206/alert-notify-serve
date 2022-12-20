import { CaslEntityInterface } from 'src/permissions/domain/casl-entity.interface';
import { PermissionEntityEnum } from '../../permissions/domain/permission.enum';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'clients' })
export class ClientOrm extends Model implements CaslEntityInterface {
  __entity__ = PermissionEntityEnum.ClientEntity;

  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(40) })
  name: string;

  @Column({ type: DataType.STRING(100) })
  surename: string;

  @Column({ type: DataType.STRING(20) })
  documentNumber: string;

  @Column({ type: DataType.STRING(100) })
  email: string;

  @Column({ type: DataType.DATE })
  dateOfBirth: Date;

  @Column({ type: DataType.STRING(20) })
  phone: string;
}
