import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// decorator type : class , method, params, property
// @ApiBearerAuth()
@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Register a new user',
  })
  //   @ApiOkResponse({}) // use later
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Post('/register')
  register(@Body() data: CreateUserDto) {
    this.userService.register(data);
  }
}
