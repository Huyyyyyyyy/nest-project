import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EUserRole } from 'src/common/interface';

export class CreateUserDto {
  // validate email unique
  @ApiProperty({
    example: 'abc@example.com',
    description: 'Email',
    format: 'email',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MaxLength(255)
  @MinLength(6)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  // at least 1 uppercase, 1 lowercase, 1 number, 1 special character
  @ApiProperty({
    example:
      'password must be included at least 1 uppercase, lowercase, number, special character',
    description: 'Password',
    format: 'password',
    uniqueItems: false,
    minLength: 8,
    maxLength: 20,
    nullable: false,
  })
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    example:
      'password must be included at least 1 uppercase, lowercase, number, special character',
    description: 'Confirm Password',
    format: 'confirm password',
    uniqueItems: false,
    minLength: 8,
    maxLength: 20,
    nullable: false,
  })
  @Matches('password')
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password2: string;

  @ApiProperty({
    example: 'John',
    description: 'First Name',
    format: 'name',
    uniqueItems: false,
    minLength: 1,
    maxLength: 20,
    nullable: false,
  })
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last Name',
    format: 'name',
    uniqueItems: false,
    minLength: 1,
    maxLength: 20,
    nullable: false,
  })
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  //validate phone number (valid/invalid)
  @IsString()
  @IsOptional()
  phone?: string;

  //dayjs / validate belongs timezone list of dayjs
  @IsString()
  @IsNotEmpty()
  timezoneCode: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum([EUserRole.client, EUserRole.coach])
  role: string;
}
