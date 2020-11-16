import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BusType from '../entity/BusType';
import BusTypeController from './busType.controller';
import BusTypeService from './busType.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusType])],
  providers: [BusTypeService],
  controllers: [BusTypeController],
  exports: [BusTypeService],
})
export default class BusTypeModule {}
