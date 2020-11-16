import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import Ticket from '../entity/Ticket';

@Injectable()
export default class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(ticket: Ticket): Promise<Ticket> {
    return this.ticketRepository.save(ticket);
  }

  async getById(ticketId: number): Promise<Ticket | undefined> {
    return this.ticketRepository.findOne(ticketId);
  }

  async getAllByUserId(userId: string): Promise<Ticket[]> {
    return this.ticketRepository.find({ userId });
  }

  async getAllByTripId(tripId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({ tripId });
  }

  async update(ticket: Ticket): Promise<UpdateResult> {
    return this.ticketRepository.update(ticket.id, ticket);
  }

  async deleteById(ticketId: number): Promise<DeleteResult> {
    return this.ticketRepository.delete(ticketId);
  }
}
