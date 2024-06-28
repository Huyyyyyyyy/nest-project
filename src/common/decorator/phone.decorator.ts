import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Country, getCountryForTimezone } from 'countries-and-timezones';
import {
  getCountryCallingCode,
  isSupportedCountry,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';

export const ValidatePhone = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'validatePhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return true;
          const object: Object = args.object;
          const timezone: string = object['timezoneCode'];
          const country: Country = getCountryForTimezone(timezone);
          const countryCode: any = country['id'];
          if (!isSupportedCountry(countryCode)) return false;
          const countryCallingCode = getCountryCallingCode(countryCode);
          const formattedPhoneNumber = `+${countryCallingCode}${value}`
          const phoneNumber = parsePhoneNumberFromString(formattedPhoneNumber);
          return !phoneNumber ? false : phoneNumber.isValid();
        },
        defaultMessage() {
          return 'Invalid phone number';
        },
      },
    });
  };
};
