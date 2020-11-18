import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, } from 'typeorm';
import { IsNotEmpty} from 'class-validator';
import BusType from './BusType';
import User from './User';
  
@Entity()
export default class Bus {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  name!: string;

  @IsNotEmpty()
  @Column()
  seatsAmount!: number;

  @IsNotEmpty()
  @Column()
  number!: number;

  @IsNotEmpty({ message: 'Виберіть тип автобуса' })
  @Column()
  busTypeId!: number;

  @Column({ nullable: true })
  busDriverId!: string;

  @OneToOne(() => User)
  @JoinColumn()
  busDriver!: User;

  @ManyToOne(
    () => BusType,
    (busType) => busType.buses,
  )
  busType!: BusType;
}
