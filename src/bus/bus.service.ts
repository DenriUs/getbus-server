import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import Bus from '../entity/Bus';

@Injectable()
export default class BusService {
  constructor(
    @InjectRepository(Bus)
    private readonly busTypeRepository: Repository<Bus>,
  ) {}

  async create(bus: Bus): Promise<Bus> {
    return this.busTypeRepository.save(bus);
  }

  async getById(busId: number): Promise<Bus | undefined> {
    return this.busTypeRepository.findOne(busId);
  }

  async getAll(): Promise<Bus[]> {
    return this.busTypeRepository.find();
  }

  async update(bus: Bus): Promise<UpdateResult> {
    return this.busTypeRepository.update(bus.id, bus);
  }

  async deleteById(busId: number): Promise<DeleteResult> {
    return this.busTypeRepository.delete(busId);
  }
}
