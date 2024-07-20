import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Public()
  @Post('auth/sign-in')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data.email, data.password);
  }
}
