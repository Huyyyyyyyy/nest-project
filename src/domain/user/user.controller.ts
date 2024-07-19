import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReq } from 'src/common/decorator/user.decorator';
import { User } from '@prisma/client';
import { Public } from 'src/common/decorator/public.decorator';

// decorator type : class , method, params, property
// @ApiBearerAuth()
//Exclude password from response
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  findMany() {
    return this.userService.findMany();
  }

  @Public()
  @ApiOperation({
    summary: 'Register a new user',
  })
  //   @ApiOkResponse({}) // use later
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get('/me')
  getMe(@UserReq() user: User) {
    return user;
  }

  @ApiOperation({
    summary: 'Update new password for user',
  })
  @ApiBadRequestResponse({ description: 'Update password failed' })
  @Post('/updatePassword')
  updatePassword(@Body() data: UpdatePasswordDto) {
    this.userService.updatePassword(data);
  }

  @ApiOperation({
    summary: 'Update user information',
  })
  @ApiBadRequestResponse({ description: 'Update user failed' })
  @Post('/updateUser')
  updateUser(@Body() data: UpdateUserDto) {
    this.userService.updateUser(data);
  }
}
