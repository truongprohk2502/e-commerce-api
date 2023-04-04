import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

const FACEBOOK_GRAPH_API =
  'https://graph.facebook.com/me?fields=first_name,last_name,picture,email&access_token=';

@Injectable()
export class FacebookService {
  constructor(private httpService: HttpService) {}

  async getFacebookInfo(token: string) {
    const observable = this.httpService.get(FACEBOOK_GRAPH_API + token);
    const data = await lastValueFrom(observable);
    return {
      email_address: data.data.email,
      first_name: data.data.first_name,
      last_name: data.data.last_name,
      image_url: data.data.picture.data.url,
    };
  }
}
