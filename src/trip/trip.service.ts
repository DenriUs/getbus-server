import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import Trip from '../entity/Trip';

@Injectable()
export default class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  async create(trip: Trip): Promise<Trip> {
    return this.tripRepository.save(trip);
  }

  async getById(tripId: number): Promise<Trip | undefined> {
    return this.tripRepository.findOne(tripId);
  }

  async getAll(): Promise<Trip[]> {
    return this.tripRepository.find();
  }

  async update(trip: Trip): Promise<UpdateResult> {
    return this.tripRepository.update(trip.id, trip);
  }

  async deleteById(tripId: number): Promise<DeleteResult> {
    return this.tripRepository.delete(tripId);
  }
}
