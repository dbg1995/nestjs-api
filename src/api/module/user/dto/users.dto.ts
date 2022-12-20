import { Exclude, Expose, Type } from 'class-transformer';

import { UserDTO } from './user.dto';
import { PaginationDTO } from '../../../../shared/module/pagy/dto/pagination.dto';

@Exclude()
export class UsersDTO {
  @Expose()
  @Type(() => UserDTO)
  readonly items: UserDTO[];

  @Expose()
  @Type(() => PaginationDTO)
  readonly pagination: PaginationDTO;
}
