import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'int-or-null', async: false })
export class IsNullableInt implements ValidatorConstraintInterface {
  validate(val: any) {
    return Number.isInteger(val) || val === null;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be interger or null`;
  }
}
