import { IsDefined, IsString } from 'class-validator';
import { EditRolePayload } from 'src/roles/application/edit-role.service';

export class EditRoleDto implements EditRolePayload {
  @IsDefined()
  @IsString()
  name: string;
}
