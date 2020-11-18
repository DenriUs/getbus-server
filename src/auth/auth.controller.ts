import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import User from '../entity/User';
import UserService from '../user/user.service';
import { ForAuthorized, ForRoles } from './auth.decorators';
import AuthService from './auth.service';
import Roles from './roles';

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    if (!email || !password) {
      throw new BadRequestException();
    }
    const user = await this.userService.getByEmail(email);
    if (!user || !await this.userService.checkPassword(password, user.password)) {
      throw new BadRequestException('Неправильний логін або пароль');
    }
    return { accessToken: await this.authService.login(user) };
  }

  @Post('register')
  async register(@Body() userFromBody: User): Promise<void> {
    await this.authService.administratorEnsureRegistered();
    await this.verifyRegistrationData(userFromBody);
    userFromBody.role = Roles.Customer;
    await this.authService.register(userFromBody);
  }

  @ForAuthorized()
  @ForRoles(Roles.Administrator)
  @Post('registerWorker')
  async registerWorker(@Body() userFromBody: User): Promise<void> {
    if (!userFromBody.role || userFromBody.role === Roles.Administrator) {
      throw new BadRequestException();
    }
    await this.verifyRegistrationData(userFromBody);
    await this.authService.register(userFromBody);
  }

  @ForAuthorized()
  @Get('checkLoginStatus')
  checkLoginStatus(): void {
    return;
  }

  private async verifyRegistrationData(user: User) {
    if (!await this.userService.isEmailUnique(user.email)) {
      throw new BadRequestException(`Email: ${user.email} вже зайнятий`);
    }
    if (!await this.userService.isPhoneNumberUnique(user.phoneNumber)) {
      throw new BadRequestException(`Номер телефону: ${user.phoneNumber} вже зайнятий`);
    }
  }
}
