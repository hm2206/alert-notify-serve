import { IsDefined, IsUUID } from 'class-validator';
import { FindUserRequest } from 'src/users/application/find-user.service';

export class FindUserDto implements FindUserRequest {
  @IsDefined()
  @IsUUID(4)
  id: string;
}
