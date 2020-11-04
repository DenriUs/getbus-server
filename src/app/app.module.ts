import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import UserModule from 'src/user/user.module';
import AuthModule from '../auth/auth.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
  ],
})
export default class AppModule {}
