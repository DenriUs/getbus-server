import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SupportRequest from '../entity/SupportRequest';
import SupportRequestController from './supportRequest.controller';
import SupportRequestService from './supportRequest.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupportRequest])],
  providers: [SupportRequestService],
  controllers: [SupportRequestController],
  exports: [SupportRequestService],
})
export default class SupportRequestModule {}
