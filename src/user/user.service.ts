import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { compare } from 'bcrypt';
import User from '../entity/User';
import Roles from '../auth/roles';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  update(user: User): Promise<UpdateResult> {
    return this.userRepository.update(user.id, user);
  }

  deleteById(userId: string): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }

  getById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ id });
  }

  getByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  getUsersInRole(role: Roles): Promise<User[]> {
    return this.userRepository.find({ role });
  }

  checkPassword(incomingPassword: string, currentPassword: string): Promise<boolean> {
    return compare(incomingPassword, currentPassword);
  }

  async isEmailUnique(email: string): Promise<boolean> {
    return await this.userRepository.findOne({ email }) === undefined;
  }

  async isPhoneNumberUnique(phoneNumber: string): Promise<boolean> {
    return await this.userRepository.findOne({ phoneNumber }) === undefined;
  }

  async checkIfAdministratorExist(): Promise<boolean> {
    return await this.userRepository.findOne({ role: Roles.Administrator }) === undefined;
  }
}
