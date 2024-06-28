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
import { IsPasswordMatching } from 'src/common/decorator/match.decorator';
import { ValidatePhone } from 'src/common/decorator/phone.decorator';
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
    example: 'H0397363542h@',
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
    example: 'H0397363542h@',
    description: 'Confirm Password',
    format: 'confirm password',
    uniqueItems: false,
    minLength: 8,
    maxLength: 20,
    nullable: false,
  })
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @IsPasswordMatching()
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
  @ApiProperty({
    example: '0397363542',
    description: 'Phone number',
    format: 'phone',
    uniqueItems: true,
    minLength: 10,
    maxLength: 12,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @ValidatePhone({ message: 'Phone number is invalid' })
  phone?: string;

  //dayjs / validate belongs timezone list of dayjs
  @ApiProperty({
    example: 'Asia/Ho_Chi_Minh',
    description: 'Timezone Code',
    format: 'Timezone Code',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  timezoneCode: string;

  @ApiProperty({
    example: 'client',
    description: 'User Role',
    format: 'role',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum([EUserRole.client, EUserRole.coach], {
    message:
      'Role must be included one of roles in our system "client / onwer / coach"',
  })
  role: string;
}
