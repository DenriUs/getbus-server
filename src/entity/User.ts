import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
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
  birthDate!: Date;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email!: string;

  @IsNotEmpty()
  @Column()
  password!: string;

  @IsNotEmpty()
  @Column()
  passportNo!: string;

  @IsNotEmpty()
  @IsPhoneNumber('UA', { message: 'Введіть коректний номер телефону' })
  @Column()
  phoneNumber!: string;

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
