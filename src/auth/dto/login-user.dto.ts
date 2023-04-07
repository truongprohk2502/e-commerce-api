import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ example: 'truong@gmail.com' })
  emailAddress: string;

  @IsString()
  @ApiProperty({ example: 'Aa@123456' })
  password: string;
}
