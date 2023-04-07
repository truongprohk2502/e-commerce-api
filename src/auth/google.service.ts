import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleService {
  private oauthClient: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.oauthClient = new OAuth2Client(
      configService.get('GOOGLE_CLIENT_ID'),
      configService.get('GOOGLE_CLIENT_SECRET'),
    );
  }

  async getGoogleInfo(token: string) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: token,
    });
    const payload = ticket.getPayload();
    return {
      emailAddress: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      imageUrl: payload.picture,
    };
  }
}
