import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, IsNull, Not, Repository, UpdateResult } from 'typeorm';
import Bus from '../entity/Bus';

@Injectable()
export default class BusService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  async create(bus: Bus): Promise<Bus> {
    return this.busRepository.save(bus);
  }

  async getById(busId: number): Promise<Bus | undefined> {
    return this.busRepository.findOne(busId);
  }

  async getAll(): Promise<Bus[]> {
    return this.busRepository.find({ relations: ['busDriver', 'busType'] });
  }

  async getByDriverId(busDriverId: string) {
    return this.busRepository.findOne({ busDriverId });
  }
  
  async getBusesWithDrivers(): Promise<Bus[]> {
    return this.busRepository.find({
      where: { busDriverId: Not(IsNull()) },
      relations: ['busDriver']
    });
  }

  async update(bus: Bus): Promise<UpdateResult> {
    return this.busRepository.update(bus.id, bus);
  }

  async deleteById(busId: number): Promise<DeleteResult> {
    return this.busRepository.delete(busId);
  }

  async isBusNumberUnique(number: number): Promise<boolean> {
    return await this.busRepository.findOne({ number }) === undefined;
  }
}
