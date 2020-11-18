import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from '../user/user.module';
import AuthModule from '../auth/auth.module';
import TripModule from 'src/trip/trip.module';
import TicketModule from 'src/ticket/ticket.module';
import BusTypeModule from 'src/busType/busType.module';
import SupportRequestModule from 'src/supportRequest/supportRequest.module';
import BusModule from 'src/bus/bus.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    TripModule,
    TicketModule,
    SupportRequestModule,
    BusTypeModule,
    BusModule,
  ],
})
export default class AppModule {}
