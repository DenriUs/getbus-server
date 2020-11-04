import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import Roles from '../auth/roles';
  
@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @Column()
  role!: Roles;
}
  