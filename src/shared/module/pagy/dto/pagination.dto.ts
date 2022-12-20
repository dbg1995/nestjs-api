import { Expose, Exclude } from 'class-transformer';

import { Default } from '../decorator/default.decorator';

@Exclude()
export class PaginationDTO {
  @Expose()
  @Default(0)
  count: number;

  @Expose()
  @Default(0)
  total: number;

  @Expose()
  @Default(0)
  page: number;

  @Expose()
  @Default(0)
  pageCount: number;
}
