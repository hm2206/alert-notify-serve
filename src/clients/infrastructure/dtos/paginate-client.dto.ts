import { IsOptional, IsString } from 'class-validator';
import { PaginateClientRequest } from 'src/clients/application/paginate-client.service';

export class PaginateClientDto implements PaginateClientRequest {
  @IsOptional()
  @IsString()
  querySearch?: string;
}
