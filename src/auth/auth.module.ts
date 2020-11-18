import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import UserModule from '../user/user.module';
import AuthService from './auth.service';
import JwtStrategy from './jwt.strategy';
import RolesGuard from './roles.guard';
import AuthController from './auth.controller';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export default class AuthModule {}
