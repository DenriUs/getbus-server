import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from 'typeorm';
import { IsNotEmpty} from 'class-validator';
import User from './User';
import Trip from './Trip';
  
@Entity()
export default class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  price!: string;
  
  @Column()
  userId!: string;

  @Column()
  isChecked!: boolean;
  
  @IsNotEmpty()
  @Column()
  tripId!: number;

  @ManyToOne(
    () => User,
    (user) => user.tickets,
  )
  user!: User;
  
  @ManyToOne(
    () => Trip,
    (trip) => trip.tickets,
  )
  trip!: Trip;
}
