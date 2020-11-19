import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from '../user/user.module';
import AuthModule from '../auth/auth.module';
import TripModule from 'src/trip/trip.module';
import TicketModule from 'src/ticket/ticket.module';
import BusTypeModule from 'src/busType/busType.module';
import BusModule from 'src/bus/bus.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/entity/**/*.js"],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    TripModule,
    TicketModule,
    BusTypeModule,
    BusModule,
  ],
})
export default class AppModule {}
