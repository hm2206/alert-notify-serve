import { IsDefined, IsUUID } from 'class-validator';
import { FindClientRequest } from 'src/clients/application/find-client.service';

export class FindClientDto implements FindClientRequest {
  @IsDefined()
  @IsUUID(4)
  id: string;
}
