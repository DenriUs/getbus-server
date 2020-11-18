import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import User from '../entity/User';
import { ForAuthorized, ForRoles, GetUser } from '../auth/auth.decorators';
import Roles from '../auth/roles';
import UserService from './user.service';
import BusService from 'src/bus/bus.service';

@ForAuthorized()
@Controller('user')
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly busService: BusService
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

  @Get('getOwnRole')
  async getOwnRole(@GetUser() userFromRequest: User): Promise<Roles> {
    return userFromRequest.role;
  }

  @Get('getUsersInRole/:role')
  async getUserInRole(@Param('role') role: number): Promise<User[]> {
    return await this.userService.getUsersInRole(role);
  }

  @Get('getBusDriversWithoutBus')
  async getBusDriverWithoutBus(): Promise<User[]> {
    const buses = await this.busService.getAll();
    const busDrivers = await this.userService.getUsersInRole(Roles.BusDriver);
    console.log(buses, busDrivers)
    const driversWithoutBuses = busDrivers.filter((busDriver) => {
      return buses.every((bus) => bus.busDriverId !== busDriver.id)
    });
    console.log(driversWithoutBuses);
    return driversWithoutBuses;
  }

  @Post('update')
  async update(@Body() user: User): Promise<void> {
    await this.userService.update(user);
  }

  @ForRoles(Roles.Administrator)
  @Post('delete/:userId')
  async delete(@Param('userId') userId: string): Promise<void> {
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
