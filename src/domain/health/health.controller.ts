import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('health')
@ApiBearerAuth()
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 200,
      message: 'success',
    };
  }
}
