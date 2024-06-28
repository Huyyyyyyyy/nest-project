import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsPasswordMatching } from 'src/common/decorator/match.decorator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Email',
    format: 'email',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'H0397363542h@',
    description: 'Old password',
    format: 'password',
    uniqueItems: false,
    nullable: false,
  })
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty({
    example: 'H0397363542h@',
    description: 'New password',
    format: 'password',
    uniqueItems: false,
    nullable: false,
  })
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  newPassword: string;

  @ApiProperty({
    example: 'H0397363542h@',
    description: 'Confirm new password',
    format: 'password',
    uniqueItems: false,
    nullable: false,
  })
  @IsPasswordMatching('newPassword', {
    message: 'Your new password is not match',
  })
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  confirmNewPassword: string;
}
