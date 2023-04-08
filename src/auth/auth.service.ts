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
import { AccountType } from 'src/common/enums/account-type.enum';
import { FacebookService } from './facebook.service';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import { IJwtPayload } from 'src/common/decorators/jwt-payload.decorator';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private googleService: GoogleService,
    private facebookService: FacebookService,
  ) {}

  private async generateJwtToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload);
  }

  private async generateHashPassword(password: string) {
    return hash(password, genSaltSync());
  }

  async register(createUserDto: CreateUserDto) {
    const { password, emailAddress } = createUserDto;

    const existedUser = await this.usersService.findByEmail(emailAddress);
    if (existedUser)
      throw new ConflictException('The email address already exists');

    const hashPass = await this.generateHashPassword(password);

    const createdUser = await this.usersService.create({
      ...createUserDto,
      password: hashPass,
    });

    const token = await this.generateJwtToken({
      id: createdUser.id,
      emailAddress,
      role: Role.User,
    });

    return { token, userInfo: createdUser };
  }

  async login(loginUserDto: LoginUserDto) {
    const { emailAddress, password } = loginUserDto;

    const existedUser = await this.usersService.findByEmail(emailAddress);
    if (!existedUser)
      throw new NotFoundException('The email address does not exist');

    const isCorrectPassword = await compare(password, existedUser.password);
    if (!isCorrectPassword)
      throw new BadRequestException('The password is incorrect');

    const token = await this.generateJwtToken({
      id: existedUser.id,
      emailAddress,
      role: existedUser.role,
    });

    return { token, userInfo: existedUser };
  }

  async loginGoogle(loginGoogleDto: LoginGoogleDto) {
    const googleInfo = await this.googleService.getGoogleInfo(
      loginGoogleDto.idToken,
    );
    const { emailAddress } = googleInfo;

    const existedUser = await this.usersService.findByEmail(
      emailAddress,
      AccountType.UsingGoogle,
    );
    const token = await this.generateJwtToken({
      id: existedUser.id,
      emailAddress,
      role: Role.User,
    });

    if (existedUser) {
      return { token, userInfo: existedUser };
    } else {
      const createdUser = await this.usersService.createGoogle(googleInfo);
      return { token, userInfo: createdUser };
    }
  }

  async loginFacebook(loginFacebookDto: LoginFacebookDto) {
    const facebookInfo = await this.facebookService.getFacebookInfo(
      loginFacebookDto.accessToken,
    );

    const { emailAddress } = facebookInfo;

    const existedUser = await this.usersService.findByEmail(
      emailAddress,
      AccountType.UsingFacebook,
    );
    const token = await this.generateJwtToken({
      id: existedUser.id,
      emailAddress,
      role: Role.User,
    });

    if (existedUser) {
      return { token, userInfo: existedUser };
    } else {
      const createdUser = await this.usersService.createFacebook(facebookInfo);
      return { token, userInfo: createdUser };
    }
  }
}
