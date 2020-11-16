import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsPassportNumber, IsPhoneNumber } from 'class-validator';
import Roles from '../auth/roles';
import Trip from './Trip';
import SupportRequest from './SupportRequest';
import Message from './Message';
import Ticket from './Ticket';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsNotEmpty()
  @Column()
  firstName!: string;

  @IsNotEmpty()
  @Column()
  lastName!: string;

  @Column()
  birthDate?: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email!: string;

  @IsNotEmpty()
  @Column()
  password!: string;

  @IsNotEmpty()
  @IsPhoneNumber('UA')
  @Column()
  phoneNumber!: string;

  @IsPassportNumber('UA')
  @Column()
  passportNo?: string;

  @IsNotEmpty()
  @Column()
  role!: Roles;

  @Column()
  pushNotificationToken?: string;

  @OneToMany(
    () => Trip,
    (trip) => trip.busDriverId
  )
  trips!: Trip[];

  @OneToMany(
    () => Ticket,
    (ticket) => ticket.userId
  )
  tickets!: Ticket[];

  @OneToMany(
    () => SupportRequest,
    (supporRequest) => supporRequest.supportWorkerId,
  )
  workerSupportRequests!: SupportRequest[];

  @OneToMany(
    () => SupportRequest,
    (supporRequest) => supporRequest.userId,
  )
  userSupportRequests!: SupportRequest[];

  @OneToMany(
    () => Message,
    (message) => message.userId,
  )
  messages!: Message[];
}
