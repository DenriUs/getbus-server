import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ForAuthorized, ForRoles } from '../auth/auth.decorators';
import Roles from '../auth/roles';
import Bus from '../entity/Bus';
import BusService from './bus.service';

@ForAuthorized()
@ForRoles(Roles.Administrator, Roles.Dispatcher)
@Controller('bus')
export default class BusController {
  constructor(
    private readonly busService: BusService,
  ) {}

  @Post('create')
  async create(@Body() bus: Bus): Promise<void> {
    if (!await this.busService.isBusNumberUnique(bus.number)) {
      throw new BadRequestException('Автобус з таким номер вже існує');
    }
    await this.busService.create(bus);
  }

  @Get('get')
  async getById(@Body() busId: number): Promise<Bus> {
    const bus = await this.busService.getById(busId);
    if (!bus) {
      throw new NotFoundException();
    }
    return bus;
  }

  @Get('getAll')
  async getAll(): Promise<Bus[]> {
    return await this.busService.getAll();
  }

  @Get('getByDriverId/:driverId')
  async getByDriverId(@Param('driverId') driverId: string): Promise<Bus | undefined> {
    return await this.busService.getByDriverId(driverId);
  }

  @Post('update')
  async update(@Body() bus: Bus): Promise<void> {
    await this.busService.update(bus);
  }

  @Get('checkIfBusNumberIsUnique/:number')
  async checkIfBusNumberIsUnique(@Param('number') number: number): Promise<boolean> {
    return await this.busService.isBusNumberUnique(number);
  }

  @Post('delete/:busId')
  async delete(@Param('busId') busId: number): Promise<void> {
    try {
      if (!await this.busService.getById(busId)) {
        throw new NotFoundException();
      }
      await this.busService.deleteById(busId);
    } catch {
      throw new BadRequestException();
    }
  }
}
