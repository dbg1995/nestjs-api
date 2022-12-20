import { Exclude, Expose } from 'class-transformer';

import { Default } from '../decorator/default.decorator';

@Exclude()
export class ErrorDetailDTO {
  @Expose()
  readonly code: number;

  @Expose()
  readonly message: string;

  @Expose()
  @Default(null)
  readonly property: string;
}
