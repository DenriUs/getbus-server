import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import Ticket from './Ticket';
import User from './User';
import { TripState } from 'src/trip/tripState';
  
@Entity()
export default class Trip {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  departureCity!: string;

  @IsNotEmpty()
  @Column()
  arrivalCity!: string;

  @IsNotEmpty()
  @Column()
  departureDateTime!: Date;

  @IsNotEmpty()
  @Column()
  arrivalDateTime!: Date;

  @IsNotEmpty()
  @Column()
  availableSeatsAmount!: number;

  @IsNotEmpty()
  @Column()
  seatPrice!: number;

  @IsNotEmpty()
  @Column()
  tripTime!: string;

  @IsNotEmpty()
  @Column()
  tripState!: TripState;

  @Column()
  busDriverId!: string;

  @ManyToOne(
    () => User,
    (busDriver) => busDriver.trips,
  )
  busDriver!: User;

  @OneToMany(
    () => Ticket,
    (ticket) => ticket.tripId,
  )
  tickets!: Ticket[];
}
