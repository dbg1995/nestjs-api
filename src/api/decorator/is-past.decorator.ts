import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  maxDate,
  isDate,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPast', async: true })
export class IsPastConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    return !isDate(value) || maxDate(value, new Date());
  }
}

export const IsPast = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPastConstraint,
    });
  };
};
