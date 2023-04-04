import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { GoogleService } from './google.service';
import { FacebookService } from './facebook.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleService, FacebookService, JwtStrategy],
})
export class AuthModule {}
