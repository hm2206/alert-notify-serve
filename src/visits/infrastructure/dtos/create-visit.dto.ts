import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsUUID } from 'class-validator';
import { ClientInterface } from 'src/clients/domain/client.interface';
import { CreateVisitRequest } from 'src/visits/application/create-visit.service';

export class CreateVisitDto implements CreateVisitRequest {
  @IsDefined()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsDefined()
  @IsUUID(4)
  clientId: string;
  client: ClientInterface;
}
