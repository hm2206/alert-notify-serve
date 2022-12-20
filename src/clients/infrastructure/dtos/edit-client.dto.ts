import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsDate,
  IsPhoneNumber,
  IsOptional,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { EditClientPayload } from 'src/clients/application/edit-client.service';

export class EditClientDto implements EditClientPayload {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(40)
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(100)
  surename: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  documentNumber: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateOfBirth: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
