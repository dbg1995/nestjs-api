import { Expose, Exclude } from 'class-transformer';

import { Default } from '../../../decorator/default.decorator';
import { BaseDTO } from '../../../dto/base.dto';

@Exclude()
export class UserDTO extends BaseDTO {
  @Expose()
  readonly status: string;

  @Expose()
  readonly name: string;

  @Expose()
  @Default(null)
  readonly avatar: string;
}
