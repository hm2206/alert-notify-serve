import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { EditRolePayload } from 'src/roles/application/edit-role.service';

export class EditRoleDto implements EditRolePayload {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isRoot: boolean;
}
