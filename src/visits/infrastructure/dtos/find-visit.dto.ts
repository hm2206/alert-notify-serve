import { IsDefined, IsUUID } from 'class-validator';
import { FindVisitRequest } from 'src/visits/application/find-visit.service';

export class FindVisitDto implements FindVisitRequest {
  @IsDefined()
  @IsUUID(4)
  id: string;
}
