import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, MaxLength, MinLength } from 'class-validator';
import { ValidateAuthRequest } from 'src/auth/application/validate-auth.service';
import { PasswordUserValue } from 'src/users/domain/value-objects/password-user.value';

export class ValidateAuthDto implements ValidateAuthRequest {
  @ApiProperty()
  @IsDefined()
  username: string;

  @ApiProperty()
  @IsDefined()
  @MinLength(PasswordUserValue.min)
  @MaxLength(PasswordUserValue.max)
  password: string;
}
