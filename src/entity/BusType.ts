import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import Bus from './Bus';
  
@Entity()
export default class BusType {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  name!: string;

  @OneToMany(
    () => Bus,
    (bus) => bus.busTypeId,
  )
  buses!: Bus[];
}
