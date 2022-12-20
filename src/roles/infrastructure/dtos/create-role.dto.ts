import { IsDefined, IsString } from 'class-validator';
import { CreateRoleRequest } from 'src/roles/application/create-role.service';

export class CreateRoleDto implements CreateRoleRequest {
  @IsDefined()
  @IsString()
  name: string;
}
