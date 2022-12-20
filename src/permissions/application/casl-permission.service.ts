import { Injectable } from '@nestjs/common';
import { AnyAbility, defineAbility } from '@casl/ability';
import { CaslEntityInterface } from '../domain/casl-entity.interface';
import { JwtResponse } from 'src/auth/application/jwt.strategy';
import { PermissionOrm } from 'src/database/domain/permission.orm';
import {
  PermissionEntityEnum,
  PermissionModeEnum,
} from '../domain/permission.enum';

@Injectable()
export class CaslPermissionService {
  async execute({ auth, subject }: CaslPermissionRequest): Promise<AnyAbility> {
    // obtener permisos
    const permissions = await PermissionOrm.findAll({
      where: {
        roleId: auth.roleId,
        entity: subject.entity,
      },
    });

    // definir habilidades
    const ability = defineAbility(
      (can) => {
        permissions.forEach((permission) =>
          can(permission.mode, permission.entity),
        );
      },
      {
        detectSubjectType: (object: CaslEntityInterface) => object.__entity__,
      },
    );

    // reponse
    return ability;
  }
}

export interface CaslPermissionAction {
  entity: PermissionEntityEnum;
  action: PermissionModeEnum;
}

export interface CaslPermissionRequest {
  auth: JwtResponse;
  subject: CaslPermissionAction;
}
