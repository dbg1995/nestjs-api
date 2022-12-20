import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class BaseDTO {
  @Expose()
  readonly id: number;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
