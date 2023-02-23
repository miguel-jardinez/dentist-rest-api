import { Module } from '@nestjs/common';
import { DentistServicesService } from './dentist-services.service';
import { DentistServicesController } from './dentist-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentistServiceEntity } from './entities/dentist-service.entity';
import { AmountEntityEntity } from './entities/amount-entity.entity';
import { ErrorService } from '../utils/ErrorService';

@Module({
  imports: [
    TypeOrmModule.forFeature([DentistServiceEntity, AmountEntityEntity]),
  ],
  controllers: [DentistServicesController],
  providers: [DentistServicesService, ErrorService],
})
export class DentistServicesModule {}
