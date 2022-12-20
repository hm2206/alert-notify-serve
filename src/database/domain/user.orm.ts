import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { UserInterface } from 'src/users/domain/user.interface';
import { RoleOrm } from './role.orm';

@Table({ modelName: 'users' })
export class UserOrm extends Model implements UserInterface {
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @ForeignKey(() => RoleOrm)
  @Column({ type: DataType.UUID })
  roleId: string;

  @BelongsTo(() => RoleOrm)
  role: RoleOrm;
}
