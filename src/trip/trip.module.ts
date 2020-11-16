import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TicketModule from '../ticket/ticket.module';
import Trip from '../entity/Trip';
import TripController from './trip.controller';
import TripService from './trip.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), TicketModule],
  providers: [TripService],
  controllers: [TripController],
  exports: [TripService],
})
export default class TripModule {}
