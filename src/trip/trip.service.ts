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
    return this.tripRepository.find({ relations: ['busDriver'] });
  }

  async getInProgressTrips(): Promise<Trip[]> {
    return this.tripRepository.find({ tripState: 'В процесі' });
  }

  async searchTrips(
    departureCity: string,
    arrivalCity: string,
  ): Promise<Trip[]> {
    return this.tripRepository.find({ where: { departureCity, arrivalCity }, relations: ['busDriver']});
  }

  async update(trip: Trip): Promise<UpdateResult> {
    return this.tripRepository.update(trip.id, trip);
  }

  async deleteById(tripId: number): Promise<DeleteResult> {
    return this.tripRepository.delete(tripId);
  }
}
