import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty} from 'class-validator';
import User from './User';
import SupportRequest from './SupportRequest';
  
@Entity()
export default class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  text!: string;

  @IsNotEmpty()
  @Column()
  sentDateTime!: Date;

  @IsNotEmpty()
  @Column()
  userId!: string;

  @IsNotEmpty()
  supportRequestId!: number;

  @ManyToOne(
    () => User,
    (user) => user.messages,
  )
  user!: User;

  @ManyToOne(
    () => SupportRequest,
    (supportRequest) => supportRequest.messages,
  )
  supportRequest!: SupportRequest;
}
