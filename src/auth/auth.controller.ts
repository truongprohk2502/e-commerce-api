import { Body, Controller, Post, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthenticationSwagger } from './swaggers/authentication.swagger';
import { LoginGoogleDto } from './dto/login-google.dto';
import { LoginFacebookDto } from './dto/login-facebook.dto';
import { UserSwagger } from 'src/users/swaggers/user.swagger';
import {
  IJwtPayload,
  JwtPayload,
} from 'src/common/decorators/jwt-payload.decorator';
import { UseJwtGuard } from 'src/common/decorators/jwt-guard.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/user-info')
  @UseJwtGuard()
  @ApiOperation({ summary: 'Get user info by token' })
  @ApiOkResponse({
    description: 'Get user info successfully',
    schema: UserSwagger,
  })
  @ApiUnauthorizedResponse({ description: 'The token is invalid' })
  async getUserInfo(@JwtPayload() payload: IJwtPayload) {
    return this.authService.getUserInfo(payload);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register an user account' })
  @ApiCreatedResponse({
    description: 'Register successfully',
    schema: AuthenticationSwagger,
  })
  @ApiConflictResponse({
    description: 'The email address already exists',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login an user account' })
  @ApiCreatedResponse({
    description: 'Login successfully',
    schema: AuthenticationSwagger,
  })
  @ApiNotFoundResponse({
    description: 'The email address does not exist',
  })
  @ApiBadRequestResponse({
    description: 'The password is incorrect',
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('/login-google')
  @ApiOperation({ summary: 'Login with google account' })
  @ApiCreatedResponse({
    description: 'Login successfully',
    schema: AuthenticationSwagger,
  })
  async loginGoogle(@Body() loginGoogleDto: LoginGoogleDto) {
    return this.authService.loginGoogle(loginGoogleDto);
  }

  @Post('/login-facebook')
  @ApiOperation({ summary: 'Login with facebook account' })
  @ApiCreatedResponse({
    description: 'Login successfully',
    schema: AuthenticationSwagger,
  })
  async loginFacebook(@Body() loginFacebookDto: LoginFacebookDto) {
    return this.authService.loginFacebook(loginFacebookDto);
  }
}
