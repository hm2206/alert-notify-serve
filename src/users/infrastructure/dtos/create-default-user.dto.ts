import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateDefaultUserRequest } from 'src/users/application/create-default-user.service';
import { PasswordUserValue } from 'src/users/domain/value-objects/password-user.value';

export class CreateDefaultUserDto implements CreateDefaultUserRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(PasswordUserValue.min)
  @MaxLength(PasswordUserValue.max)
  password: string;
}
