import { ApiProperty } from '@nestjs/swagger';

export class SesionTemplateResponeDto {
  //TODO : will be removed
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The id of the session template',
    example : 1
  })
  id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the session template',
    example : 'The name of the session template 1'
  })
  name: string;
  
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The duration of the session template bas on minute',
    example : 30
  })
  duration: number;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Session template status',
    example : true
  })
  active: boolean;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Date',
    example : '2021-09-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Date',
    example : '2021-09-01T00:00:00.000Z'
  })
  updatedAt: Date;
}
