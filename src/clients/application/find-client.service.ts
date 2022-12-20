import { Injectable } from '@nestjs/common';
import { ClientOrm } from 'src/database/domain/client.orm';

@Injectable()
export class FindClientService {
  async execute(request: FindClientRequest) {
    return ClientOrm.findOne({
      where: {
        id: request.id,
      },
    });
  }
}

export class FindClientRequest {
  id: string;
}
