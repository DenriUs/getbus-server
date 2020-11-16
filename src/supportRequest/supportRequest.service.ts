import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import SupportRequest from '../entity/SupportRequest';

@Injectable()
export default class SupportRequestService {
  constructor(
    @InjectRepository(SupportRequest)
    private readonly supportRequestRepository: Repository<SupportRequest>,
  ) {}

  async create(supportRequest: SupportRequest): Promise<SupportRequest> {
    return this.supportRequestRepository.save(supportRequest);
  }

  async getById(supportRequestId: number): Promise<SupportRequest | undefined> {
    return this.supportRequestRepository.findOne(supportRequestId);
  }

  async getAll(): Promise<SupportRequest[]> {
    return this.supportRequestRepository.find();
  }

  async update(supportRequest: SupportRequest): Promise<UpdateResult> {
    return this.supportRequestRepository.update(supportRequest.id, supportRequest);
  }

  async deleteById(supportRequestId: number): Promise<DeleteResult> {
    return this.supportRequestRepository.delete(supportRequestId);
  }
}
