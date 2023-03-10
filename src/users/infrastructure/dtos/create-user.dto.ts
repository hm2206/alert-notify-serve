import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
  IsEmail,
} from 'class-validator';
import { CreateUserRequest } from 'src/users/application/create-user.service';
import { PasswordUserValue } from 'src/users/domain/value-objects/password-user.value';

export class CreateUserDto implements CreateUserRequest {
  @ApiProperty()
  @IsDefined()
  username: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(PasswordUserValue.min)
  @MaxLength(PasswordUserValue.max)
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  roleId: string;
}
