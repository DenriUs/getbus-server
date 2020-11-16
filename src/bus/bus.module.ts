import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bus from '../entity/Bus';
import BusController from './bus.controller';
import BusService from './bus.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bus])],
  providers: [BusService],
  controllers: [BusController],
  exports: [BusService],
})
export default class BusModule {}
