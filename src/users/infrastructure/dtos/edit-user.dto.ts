import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { EditUserPayload } from 'src/users/application/edit-user.service';
import { PasswordUserValue } from 'src/users/domain/value-objects/password-user.value';

export class EditUserDto implements EditUserPayload {
  @ApiProperty()
  @IsDefined()
  username: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(PasswordUserValue.min)
  @MaxLength(PasswordUserValue.max)
  password?: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID(4)
  roleId: string;
}
