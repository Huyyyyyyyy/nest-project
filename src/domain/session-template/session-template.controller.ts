import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSessionTemplateDto } from './dto/create-session-template.dto';
import { ApiTags } from '@nestjs/swagger';
import { SesionTemplateResponeDto } from './dto/session-template-response.dto';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { UpdateSessionTemplateDto } from './dto/update-session-template.dto';

@Controller('session-template')
@ApiTags('SessionTemplate')
export class SessionTemplateController {
  constructor() {}

  @ApiOperationDecorator({
    type: SesionTemplateResponeDto,
    summary: 'Get a session template',
    description: 'Get a session template',
  })
  @Get(':sessionTemplateId')
  findById() {}

  @ApiOperationDecorator({
    type: SesionTemplateResponeDto,
    summary: 'Create new session template',
    description: 'Create new session template',
  })
  @Post()
  create(@Body() data: CreateSessionTemplateDto) {
    console.log(data);
  }

  @ApiOperationDecorator({
    type: SesionTemplateResponeDto,
    summary: 'Update a session template',
    description: 'Update a session template',
  })
  @Patch(':sessionTemplateId')
  updateById(
    @Param('sessionTemplateId') sessionTemplateId: number,
    @Body() data: UpdateSessionTemplateDto,
  ) {
    console.log(sessionTemplateId);
  }
}
