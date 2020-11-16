import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import SupportRequest from '../entity/SupportRequest';
import { ForAuthorized } from '../auth/auth.decorators';
import SupportRequestService from './supportRequest.service';

@ForAuthorized()
@Controller('supportRequest')
export default class SupportRequestController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
  ) {}

  @Post('create')
  async create(@Body() supportRequest: SupportRequest): Promise<void> {
    await this.supportRequestService.create(supportRequest);
  }

  @Get('get')
  async getById(@Body() supportRequestId: number): Promise<SupportRequest> {
    const supportRequest = await this.supportRequestService.getById(supportRequestId);
    if (!supportRequest) {
      throw new NotFoundException();
    }
    return supportRequest;
  }

  @Get('getAll')
  async getAll(): Promise<SupportRequest[]> {
    return await this.supportRequestService.getAll();
  }

  @Post('update')
  async update(@Body() supportRequest: SupportRequest): Promise<void> {
    await this.supportRequestService.update(supportRequest);
  }

  @Post('delete')
  async register(@Body() supportRequestId: number): Promise<void> {
    try {
      if (!await this.supportRequestService.getById(supportRequestId)) {
        throw new NotFoundException();
      }
      await this.supportRequestService.deleteById(supportRequestId);
    } catch {
      throw new BadRequestException();
    }
  }
}
