import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidatePhone } from 'src/common/decorator/phone.decorator';
import { EUserRole } from 'src/common/interface';

export class UpdateUserDto {
  @ApiProperty({
    example: '9ca9b2a4-968f-45f9-834f-fc9933356760',
    description: 'Id',
    format: 'uuid',
    uniqueItems: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'abcd@gmail.com',
    description: 'Email',
    format: 'email',
    uniqueItems: true,
    nullable: false,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'First Name',
    format: 'name',
    uniqueItems: false,
    minLength: 1,
    maxLength: 20,
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last Name',
    format: 'name',
    uniqueItems: false,
    minLength: 1,
    maxLength: 20,
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastName?: string;

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
  @MaxLength(12)
  @MinLength(10)
  @ValidatePhone({ message: 'Phone number is in valid' })
  phone?: string;

  @ApiProperty({
    example: 'Asia/Ho_Chi_Minh',
    description: 'Timezone Code',
    format: 'Timezone Code',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  timezone?: string;

  @ApiProperty({
    example: 'client',
    description: 'User Role',
    format: 'role',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  @IsEnum([EUserRole.client, EUserRole.coach], {
    message:
      'Role must be included one of roles in our system "client / owner / coach"',
  })
  role?: string;
}
