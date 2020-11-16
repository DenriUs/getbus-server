import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ForAuthorized, ForRoles } from '../auth/auth.decorators';
import Roles from '../auth/roles';
import BusType from '../entity/BusType';
import BusTypeService from './busType.service';

@ForAuthorized()
@ForRoles(Roles.Administrator)
@Controller('busType')
export default class BusTypeController {
  constructor(
    private readonly busTypeService: BusTypeService,
  ) {}

  @Post('create')
  async create(@Body() busType: BusType): Promise<void> {
    await this.busTypeService.create(busType);
  }

  @Get('getById')
  async getById(@Body() busTypeId: number): Promise<BusType> {
    const busType = await this.busTypeService.getById(busTypeId);
    if (!busType) {
      throw new NotFoundException();
    }
    return busType;
  }

  @Get('getAll')
  async getAll(): Promise<BusType[]> {
    return await this.busTypeService.getAll();
  }

  @Post('update')
  async update(@Body() busType: BusType): Promise<void> {
    await this.busTypeService.update(busType);
  }

  @Post('delete')
  async register(@Body() busTypeId: number): Promise<void> {
    try {
      if (!await this.busTypeService.getById(busTypeId)) {
        throw new NotFoundException();
      }
      await this.busTypeService.deleteById(busTypeId);
    } catch {
      throw new BadRequestException();
    }
  }
}
