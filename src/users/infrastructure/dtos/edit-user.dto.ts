import {
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
  IsEmail,
} from 'class-validator';
import { EditUserPayload } from 'src/users/application/edit-user.service';
import { PasswordUserValue } from 'src/users/domain/value-objects/password-user.value';

export class EditUserDto implements EditUserPayload {
  @IsDefined()
  username: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(PasswordUserValue.min)
  @MaxLength(PasswordUserValue.max)
  password: string;

  @IsDefined()
  @IsUUID(4)
  roleId: string;
}
