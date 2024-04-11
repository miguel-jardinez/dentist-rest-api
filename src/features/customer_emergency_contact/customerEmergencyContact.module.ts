import { Module } from '@nestjs/common';
import { CustomerEmergencyContactService } from './customerEmergencyContact.service';
import { CustomerEmergencyContactController } from './customerEmergencyContact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEmergencyContactEntity } from '@features/customer_emergency_contact/entities/customerEmergencyContact.entity';
import { ErrorService } from '@utils/ErrorService';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEmergencyContactEntity])],
  controllers: [CustomerEmergencyContactController],
  providers: [CustomerEmergencyContactService, ErrorService],
  exports: [CustomerEmergencyContactService],
})
export class CustomerEmergencyContactModule {}
