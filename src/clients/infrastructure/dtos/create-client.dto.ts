import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsDate,
  IsPhoneNumber,
  IsOptional,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateClientRequest } from 'src/clients/application/create-client.service';
import { ClientInterface } from 'src/clients/domain/client.interface';
import { CreateVisitRequest } from 'src/visits/application/create-visit.service';

export class CreateClientToVisitDto implements CreateVisitRequest {
  @ApiProperty()
  @IsDefined()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;
  client: ClientInterface;
}

export class CreateClientDto implements CreateClientRequest {
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

  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateClientToVisitDto)
  visit: CreateClientToVisitDto;
}
