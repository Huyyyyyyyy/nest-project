import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { SerializeInterceptor } from 'src/interceptor/serialize.interceptor';

@ApiTags('Google')
@Controller('credentials')
@ApiBearerAuth()
@UseInterceptors(SerializeInterceptor)
export class CredentialController {
  constructor(private credentialService: CredentialService) {}

  @Get('google-auth-url')
  getGoogleAuthUrl() {
    return this.credentialService.getGooleAuthUrl();
  }

  @Public()
  @Get('google-auth-callback')
  handleGoogleAuthCallback(@Query() query: any) {
    return this.credentialService.handleGoogleAuthCallback(query.code);
  }
}
