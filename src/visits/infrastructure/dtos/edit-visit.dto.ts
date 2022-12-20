import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsDate } from 'class-validator';
import { EditVisitPayload } from 'src/visits/application/edit-visit.service';

export class EditVisitDto implements EditVisitPayload {
  @ApiProperty()
  @IsDefined()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;
}
