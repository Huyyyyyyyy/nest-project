import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateSessionTemplateDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the session template',
    example: 'The name of the session template 1',
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The duration of the session template bas on minute',
    example: 30,
  })
  @IsOptional()
  @IsNumber()
  @Min(5)
  duration?: number;
}
