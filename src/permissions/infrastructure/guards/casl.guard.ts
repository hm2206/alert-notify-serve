import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtResponse } from 'src/auth/application/jwt.strategy';
import {
  CaslPermissionAction,
  CaslPermissionService,
} from 'src/permissions/application/casl-permission.service';
import { CASL_ACTION_DECORADOR } from '../decoratos/casl-action.decorator';
import { RoleOrm } from 'src/database/domain/role.orm';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private caslPermissionService: CaslPermissionService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const auth = request.user as JwtResponse;
    const subject = this.reflector.get<CaslPermissionAction>(
      CASL_ACTION_DECORADOR,
      context.getHandler(),
    );

    // validar si el role is root
    const isRoot = await RoleOrm.count({
      where: {
        id: auth.roleId,
        isRoot: true,
      },
    });

    // validar si es root
    if (isRoot) return true;

    // validar entity
    if (!subject?.entity) return false;

    // validar permisos
    const ability = await this.caslPermissionService.execute({
      auth,
      subject,
    });

    // response allow ability
    return ability.can(subject.action, subject.entity);
  }
}
