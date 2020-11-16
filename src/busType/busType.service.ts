import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import BusType from '../entity/BusType';

@Injectable()
export default class BusTypeService {
  constructor(
    @InjectRepository(BusType)
    private readonly busTypeRepository: Repository<BusType>,
  ) {}

  async create(busType: BusType): Promise<BusType> {
    return this.busTypeRepository.save(busType);
  }

  async getById(busTypeId: number): Promise<BusType | undefined> {
    return this.busTypeRepository.findOne(busTypeId);
  }

  async getAll(): Promise<BusType[]> {
    return this.busTypeRepository.find();
  }

  async update(busType: BusType): Promise<UpdateResult> {
    return this.busTypeRepository.update(busType.id, busType);
  }

  async deleteById(busTypeId: number): Promise<DeleteResult> {
    return this.busTypeRepository.delete(busTypeId);
  }
}
