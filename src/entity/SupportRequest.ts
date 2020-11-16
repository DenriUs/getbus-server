import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty} from 'class-validator';
import User from './User';
import Message from './Message';
import { SupportRequestState } from 'src/supportRequest/supportRequstState';
  
@Entity()
export default class SupportRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  name!: string;

  @IsNotEmpty()
  @Column()
  creationDate!: string;

  @IsNotEmpty()
  @Column()
  supportRequestState!: SupportRequestState;

  @IsNotEmpty()
  @Column()
  userId!: string;

  @IsNotEmpty()
  @Column()
  supportWorkerId!: string;

  @ManyToOne(
    () => User,
    (user) => user.userSupportRequests,
  )
  user!: User;

  @ManyToOne(
    () => User,
    (user) => user.workerSupportRequests,
  )
  supportWorker!: User;

  @OneToMany(
    () => Message,
    (message) => message.supportRequest,
  )
  messages!: Message[];
}
