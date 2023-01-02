import { Injectable } from '@nestjs/common';
import { PermissionOrm } from 'src/database/domain/permission.orm';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from '../domain/permission.enum';
import { Op } from 'sequelize';

@Injectable()
export class PaginatePermissionService {
  async execute(request: PaginatePermissionRequest) {
    const filters: any = {};

    if (request.entities?.length) {
      filters.entity = {
        [Op.in]: request.entities,
      };
    }

    if (request.modes?.length) {
      filters.mode = {
        [Op.in]: request.modes,
      };
    }

    if (request.roleIds?.length) {
      filters.roleIn = {
        [Op.in]: request.roleIds,
      };
    }

    return PermissionOrm.findAll({
      where: filters,
    });
  }
}

export interface PaginatePermissionRequest {
  entities?: PermissionEntityEnum[];
  modes?: PermissionModeEnum[];
  roleIds?: string[];
}
