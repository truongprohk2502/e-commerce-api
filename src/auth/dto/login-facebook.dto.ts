import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginFacebookDto {
  @IsString()
  @ApiProperty({ example: 'ai945jkjmbad81af.h3e5a1jdfasd.kosd90i4lnmvx6' })
  access_token: string;
}
