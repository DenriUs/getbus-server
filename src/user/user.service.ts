import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import User from '../entity/User';
import Roles from 'src/auth/roles';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user.id, user);
  }

  getById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ id });
  }

  getByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
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
