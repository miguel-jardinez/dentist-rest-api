import { Module } from '@nestjs/common';
import { CustomerFamiliarClinicHistoryService } from './customerFamiliarClinicHistory.service';
import { CustomerFamiliarClinicHistoryController } from './customerFamiliarClinicHistory.controller';

@Module({
  controllers: [CustomerFamiliarClinicHistoryController],
  providers: [CustomerFamiliarClinicHistoryService]
})
export class CustomerFamiliarClinicHistoryModule {}
