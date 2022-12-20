import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { CreateRoleRequest } from 'src/roles/application/create-role.service';

export class CreateRoleDto implements CreateRoleRequest {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isRoot: boolean;
}
