import { Module } from '@nestjs/common';
import { CustomerPersonalClinicHistoryService } from './customerPersonalClinicHistory.service';
import { CustomerPersonalClinicHistoryController } from './customerPersonalClinicHistory.controller';

@Module({
  controllers: [CustomerPersonalClinicHistoryController],
  providers: [CustomerPersonalClinicHistoryService]
})
export class CustomerPersonalClinicHistoryModule {}
