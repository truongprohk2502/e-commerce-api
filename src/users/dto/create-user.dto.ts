import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email_address: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsPhoneNumber('VI')
  phone_number: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
