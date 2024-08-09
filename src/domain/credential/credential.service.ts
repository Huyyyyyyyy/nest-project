import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { google } from 'googleapis';
import { BaseService } from 'src/common/service/base.service';
import config from 'src/config';
import { DatabaseService } from 'src/database/database.service';

const oauth2Client = new google.auth.OAuth2({
  clientId: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3300/api/credentials/google-auth-callback',
});

@Injectable()
export class CredentialService extends BaseService<
  Prisma.CredentialUncheckedCreateInput,
  Prisma.CredentialUpdateInput
> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'credential');
  }

  getGooleAuthUrl(): { authUrl: string } {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar.events.owned'],
    });
    return { authUrl };
  }

  async handleGoogleAuthCallback(code: string) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      await this.create({
        userId: 1,
        integrationType: 'google',
        token: tokens.refresh_token,
        data: JSON.stringify(tokens),
      });
      return tokens;
    } catch (error) {
      throw new BadRequestException('Authorization is invalid');
    }
  }

  async createGoogleEvent(userId: number, data) {
    const credential = await this.databaseService.credential.findFirst({
      where: {
        userId,
        integrationType: 'google',
      },
    });

    if (!credential) {
      throw new BadRequestException('Google credential not found');
    }
    const { token } = credential;
    oauth2Client.setCredentials({ refresh_token: token });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: data,
    });

    return response.data;
  }
}
