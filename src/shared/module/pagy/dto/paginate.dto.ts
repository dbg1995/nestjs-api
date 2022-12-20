import { IsInt, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { DEFAULT_PAGY_COUNT, DEFAULT_PAGY_PAGE } from '../../../../constant/common.constant';

export class PaginateDTO {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1, { context: { i18n: { min: 1 } } })
  readonly page = DEFAULT_PAGY_PAGE;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1, { context: { i18n: { min: 1 } } })
  readonly count = DEFAULT_PAGY_COUNT;
}
