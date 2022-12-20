import { Injectable } from '@nestjs/common';
import { VisitOrm } from 'src/database/domain/visit.orm';

@Injectable()
export class PaginateVisitService {
  async execute() {
    return VisitOrm.findAll();
  }
}
