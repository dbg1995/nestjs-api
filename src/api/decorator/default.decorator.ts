import { Transform } from 'class-transformer';

export function Default(defaultValue: any) {
  return Transform((object) => object.value || defaultValue, {
    toClassOnly: true,
  });
}
