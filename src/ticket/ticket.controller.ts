import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import Ticket from 'src/entity/Ticket';
import User from 'src/entity/User';
import { ForAuthorized, GetUser } from '../auth/auth.decorators';
import TicketService from './ticket.service';

@ForAuthorized()
@Controller('ticket')
export default class TicketController {
  constructor(
    private readonly ticketService: TicketService,
  ) {}

  @Post('create')
  async create(
    @GetUser() user: User,
    @Body() ticket: Ticket
  ): Promise<void> {
    ticket.isChecked = false;
    ticket.userId = user.id
    await this.ticketService.create(ticket);
  }

  @Get('getById')
  async getById(@Body() ticketId: number): Promise<Ticket> {
    const ticket = await this.ticketService.getById(ticketId);
    if (!ticket) {
      throw new NotFoundException();
    }
    return ticket;
  }

  @Get('get')
  async get(@GetUser() user: User): Promise<Ticket[]> {
    const tickets = await this.ticketService.getAllByUserId(user.id);
    if (!tickets) {
      throw new NotFoundException();
    }
    return tickets;
  }

  @Get('getAllByUserId')
  async getAllByUserId(@Body() userId: string): Promise<Ticket[]> {
    return await this.ticketService.getAllByUserId(userId);
  }

  @Post('update')
  async update(@Body() ticket: Ticket): Promise<void> {
    await this.ticketService.update(ticket);
  }

  @Post('delete')
  async delete(@Body() ticketId: number): Promise<void> {
    try {
      if (!await this.ticketService.getById(ticketId)) {
        throw new NotFoundException();
      }
      await this.ticketService.deleteById(ticketId);
    } catch {
      throw new BadRequestException();
    }
  }
}
