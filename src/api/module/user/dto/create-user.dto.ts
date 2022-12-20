import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { SHORT_LENGTH } from '../../../../constant/common.constant';

@Exclude()
export class CreateUserDTO {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(SHORT_LENGTH, { context: { i18n: { min: SHORT_LENGTH } } })
  readonly name: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(SHORT_LENGTH, { context: { i18n: { min: SHORT_LENGTH } } })
  readonly avatar: string;
}
