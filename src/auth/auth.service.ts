import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import UserService from '../user/user.service';
import User from '../entity/User';
import Roles from './roles';

@Injectable()
export default class AuthService {
  private readonly hashRounds = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  login(user: User): Promise<string> {
    return this.generateJWT(user);  
  }

  async register(user: User): Promise<void> {
    user.password = await hash(user.password, this.hashRounds);
    await this.userService.create(user);
  }

  async administratorEnsureRegistered(): Promise<void> {
    if (!await this.userService.checkIfAdministratorExist()) return;
    if (!process.env.ADMIN_LOGIN
      || !process.env.ADMIN_PASSWORD
      || !process.env.ADMIN_EMAIL
      || !process.env.ADMIN_PHONE_NUMBER) return;
    const administrator = new User();
    administrator.password = process.env.ADMIN_PASSWORD;
    administrator.email = process.env.ADMIN_EMAIL;
    administrator.phoneNumber = process.env.ADMIN_PHONE_NUMBER;
    administrator.role = Roles.Administrator;
    await this.register(administrator);
  }

  private generateJWT(user: User): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      password: user.password,
    }
    return this.jwtService.signAsync(payload);
  }
}
