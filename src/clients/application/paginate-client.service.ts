import { Injectable } from '@nestjs/common';
import { ClientOrm } from 'src/database/domain/client.orm';

@Injectable()
export class PaginateClientService {
  async execute() {
    return ClientOrm.findAll();
  }
}
