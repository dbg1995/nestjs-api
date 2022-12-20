import { Exclude, Expose, Type } from 'class-transformer';

import { ErrorDetailDTO } from './error-detail.dto';
import { Default } from '../decorator/default.decorator';

@Exclude()
export class ErrorDTO {
  @Expose()
  readonly code: number;

  @Expose()
  readonly title: string;

  @Expose()
  readonly message: string;

  @Expose()
  @Type(() => ErrorDetailDTO)
  @Default([])
  readonly errors: ErrorDetailDTO[];
}
