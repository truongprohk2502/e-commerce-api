import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthenticationSwagger } from './swaggers/authentication.swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
