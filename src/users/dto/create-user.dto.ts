import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'truong@gmail.com' })
  email_address: string;

  @IsString()
  @ApiProperty({ example: 'truong' })
  first_name: string;

  @IsString()
  @ApiProperty({ example: 'nguyen' })
  last_name: string;

  @IsPhoneNumber('VI')
  @ApiProperty({ example: '07128937281' })
  phone_number: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  @ApiProperty({ example: 'Aa@123456' })
  password: string;
}
