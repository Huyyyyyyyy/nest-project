import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export const IsPasswordMatching = (
  fieldName: string,
  validationOptions?: ValidationOptions,
) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordMatching',
      target: object.constructor,
      propertyName: propertyName,
      constraints : [fieldName],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const password: string = args.object[fieldName];
          if (value === password) {
            return true;
          }
          return false;
        },
        defaultMessage() {
          return 'Your confirm password not match';
        },
      },
    });
  };
};
