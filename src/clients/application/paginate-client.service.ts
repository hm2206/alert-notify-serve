import { Injectable } from '@nestjs/common';
import { Collection } from 'collect.js';
import sequelize, { Op } from 'sequelize';
import { ClientOrm } from 'src/database/domain/client.orm';
import { VisitOrm } from 'src/database/domain/visit.orm';

@Injectable()
export class PaginateClientService {
  async execute(request: PaginateClientRequest) {
    const [clients, counter] = await Promise.all([
      this.getClients(request),
      this.getCounts(request),
    ]);
    // settings
    return clients.map((client) => {
      // obtener visitas
      const countVisits = new Collection(JSON.parse(JSON.stringify(counter)))
        .where('clientId', client.id)
        .sum('counter');
      // response
      return Object.assign(JSON.parse(JSON.stringify(client)), {
        countVisits,
      });
    });
  }

  private async getClients(request: PaginateClientRequest) {
    const where = this.filters(request);
    // response result query
    return ClientOrm.findAll({
      where,
    });
  }

  private async getCounts(request: PaginateClientRequest) {
    const where = this.filters(request);
    // response counters
    return ClientOrm.findAll({
      attributes: [
        [sequelize.col('visits.clientId'), 'clientId'],
        [sequelize.fn('count', sequelize.col('*')), 'counter'],
      ],
      where,
      include: [{ model: VisitOrm, attributes: [] }],
      group: ['clients.id', 'clientId'],
    });
  }

  private filters(request: PaginateClientRequest) {
    let where: any = {};
    // filters
    if (request.querySearch) {
      where = Object.assign(where, {
        [Op.and]: [
          sequelize.literal(
            ` CONCAT(UPPER("name"), ' ', UPPER("surename")) like UPPER('%${request.querySearch}%')
              OR "documentNumber" like '%${request.querySearch}%'
            `,
          ),
        ],
      });
    }
    // response
    return where;
  }
}

export interface PaginateClientRequest {
  querySearch?: string;
}
