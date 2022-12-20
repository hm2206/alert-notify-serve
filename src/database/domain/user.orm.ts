import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { UserInterface } from 'src/users/domain/user.interface';
import { RoleOrm } from './role.orm';

@Table({ modelName: 'users' })
export class UserOrm extends Model implements UserInterface {
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @AllowNull(false)
  @Column({ unique: true })
  username: string;

  @AllowNull(false)
  @Column({ unique: true })
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @ForeignKey(() => RoleOrm)
  @Column({ type: DataType.UUID })
  roleId: string;

  @BelongsTo(() => RoleOrm)
  role: RoleOrm;
}
