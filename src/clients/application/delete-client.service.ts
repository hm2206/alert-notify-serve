import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientOrm } from 'src/database/domain/client.orm';
import { FindClientRequest } from './find-client.service';

@Injectable()
export class DeleteClientService {
  async execute(request: FindClientRequest) {
    const client = await ClientOrm.findOne({
      where: {
        id: request.id,
      },
    });

    if (!client) {
      throw new NotFoundException();
    }

    await client.destroy();
    return { deleted: true };
  }
}
