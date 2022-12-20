import { SetMetadata } from '@nestjs/common';
import { CaslPermissionAction } from 'src/permissions/application/casl-permission.service';

export const CASL_ACTION_DECORADOR = 'CASL_ACTION_DECORADOR';

export const CaslAction = (actions: CaslPermissionAction) =>
  SetMetadata(CASL_ACTION_DECORADOR, actions);
