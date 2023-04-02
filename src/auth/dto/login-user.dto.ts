import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email_address: string;

  @IsString()
  password: string;
}
