import {
  ConflictException,
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSaltSync, hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { GoogleService } from './google.service';
import { LoginGoogleDto } from './dto/login-google.dto';
import { AccountType } from 'src/enums/account-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private googleService: GoogleService,
  ) {}

  async generateJwtToken(email: string) {
    return this.jwtService.signAsync({ email, role: 'user' });
  }

  async generateHashPassword(password: string) {
    return hash(password, genSaltSync());
  }

  async register(createUserDto: CreateUserDto) {
    const { password, email_address } = createUserDto;

    const existedUser = await this.usersService.findByEmail(email_address);
    if (existedUser)
      throw new ConflictException('The email address already exists');

    const hashPass = await this.generateHashPassword(password);

    const createdUser = await this.usersService.create({
      ...createUserDto,
      password: hashPass,
    });

    const token = await this.generateJwtToken(email_address);

    return { token, user_info: createdUser };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email_address, password } = loginUserDto;

    const existedUser = await this.usersService.findByEmail(email_address);
    if (!existedUser)
      throw new NotFoundException('The email address does not exist');

    const isCorrectPassword = await compare(password, existedUser.password);
    if (!isCorrectPassword)
      throw new BadRequestException('The password is incorrect');

    const token = await this.generateJwtToken(email_address);

    return { token, user_info: existedUser };
  }

  async loginGoogle(loginGoogleDto: LoginGoogleDto) {
    const googleInfo = await this.googleService.getGoogleInfo(
      loginGoogleDto.id_token,
    );
    const { email_address } = googleInfo;

    const existedUser = await this.usersService.findByEmail(
      email_address,
      AccountType.UsingGoogle,
    );
    const token = await this.generateJwtToken(email_address);

    if (existedUser) {
      return { token, user_info: existedUser };
    } else {
      const createdUser = await this.usersService.createGoogle(googleInfo);
      return { token, user_info: createdUser };
    }
  }
}
