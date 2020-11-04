import { BadRequestException, Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import User from 'src/entity/User';
import UserService from '../user/user.service';
import { ForAuthorized, ForRoles, GetUser } from './auth.decorators';
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
    @Body('login') login: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    if (!login || !password) {
      throw new BadRequestException();
    }
    const user = await this.userService.getByEmail(login);
    if (!user || !await this.userService.checkPassword(password, user.password)) {
      throw new UnauthorizedException('Неправильний логін або пароль');
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

  @Get('test')
  @ForAuthorized()
  @ForRoles(Roles.Customer)
  getTest(@GetUser() user: User): { user: User } {
    return { user };
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
