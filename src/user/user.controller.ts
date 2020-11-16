import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import User from '../entity/User';
import { ForAuthorized, ForRoles, GetUser } from '../auth/auth.decorators';
import Roles from '../auth/roles';
import UserService from './user.service';

@ForAuthorized()
@Controller('user')
export default class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ForRoles(Roles.Administrator)
  @Get('getById')
  async getById(@Body() userId: string): Promise<User | undefined> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Get('getOwnInfo')
  async getOwnInfo(@GetUser() userFromRequest: User): Promise<User> {
    return userFromRequest;
  }

  @Post('update')
  async update(@Body() user: User): Promise<void> {
    await this.userService.update(user);
  }

  @ForRoles(Roles.Administrator)
  @Post('delete')
  async delete(@Body() userId: string): Promise<void> {
    try {
      if (!await this.userService.getById(userId)) {
        throw new NotFoundException();
      }
      await this.userService.deleteById(userId);
    } catch {
      throw new BadRequestException();
    }
  }
}
