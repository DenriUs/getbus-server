import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Ticket from '../entity/Ticket';
import TicketController from './ticket.controller';
import TicketService from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService],
})
export default class TicketModule {}
