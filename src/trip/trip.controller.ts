import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import Trip from '../entity/Trip';
import { ForAuthorized } from '../auth/auth.decorators';
import TripService from './trip.service';
import TicketService from 'src/ticket/ticket.service';

@ForAuthorized()
@Controller('trip')
export default class TripController {
  constructor(
    private readonly tripService: TripService,
    private readonly ticketService: TicketService,
  ) {}

  @Post('create')
  async create(@Body() trip: Trip): Promise<void> {
    await this.tripService.create(trip);
  }

  @Get('getById')
  async getById(@Body() tripId: number): Promise<Trip> {
    const trip = await this.tripService.getById(tripId);
    if (!trip) {
      throw new NotFoundException();
    }
    return trip;
  }

  @Get('getAll')
  async getAll(): Promise<Trip[]> {
    return await this.tripService.getAll();
  }

  @Get('getInProgressTrips')
  async getInProgressTrips(): Promise<Trip[]> {
    return await this.tripService.getInProgressTrips();
  }

  @Get('searchTrips')
  async searchTrips(@Query() params: any): Promise<Trip[]> {
    const dateToSearch = new Date(params.departureDateTime)
    const trips = await this.tripService.searchTrips(params.departureCity, params.arrivalCity);
    console.log(trips);
    return trips.filter((trip) => trip.departureDateTime.getDate() === dateToSearch.getDate()
      && trip.departureDateTime.getMonth() === dateToSearch.getMonth());
  }

  @Post('update')
  async update(@Body() trip: Trip): Promise<void> {
    await this.tripService.update(trip);
  }

  @Post('delete/:tripId')
  async delete(@Param('tripId') tripId: number): Promise<void> {
    try {
      if (!await this.tripService.getById(tripId)) {
        throw new NotFoundException();
      }
      const tripTickets = await this.ticketService.getAllByTripId(tripId);
      if (tripTickets) {
        for (const tripTicket of tripTickets) {
          await this.ticketService.deleteById(tripTicket.id);
        }
      }
      await this.tripService.deleteById(tripId);
    } catch {
      throw new BadRequestException();
    }
  }
}
