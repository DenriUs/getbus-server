import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ForAuthorized, ForRoles } from '../auth/auth.decorators';
import Roles from '../auth/roles';
import Bus from '../entity/Bus';
import BusService from './bus.service';

@ForAuthorized()
@ForRoles(Roles.Administrator)
@Controller('bus')
export default class BusController {
  constructor(
    private readonly busService: BusService,
  ) {}

  @Post('create')
  async create(@Body() bus: Bus): Promise<void> {
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

  @Post('update')
  async update(@Body() bus: Bus): Promise<void> {
    await this.busService.update(bus);
  }

  @Post('delete')
  async delete(@Body() busId: number): Promise<void> {
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
