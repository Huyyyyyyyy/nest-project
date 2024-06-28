import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export const IsPasswordMatching = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordMatching',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const password: string = args.object['password'];
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
