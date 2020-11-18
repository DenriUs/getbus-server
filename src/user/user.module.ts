import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserService from './user.service';
import User from '../entity/User';
import UserController from './user.controller';
import BusModule from 'src/bus/bus.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BusModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export default class UserModule {}
