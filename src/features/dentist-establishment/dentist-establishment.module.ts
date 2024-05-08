import { Module } from '@nestjs/common';
import { DentistEstablishmentService } from './dentist-establishment.service';
import { DentistEstablishmentController } from './dentist-establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from '@utils/ErrorService';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { WorkingScheduleModule } from '@features/working_schedule/working_schedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([DentistEstablishmentEntity]), WorkingScheduleModule],
  controllers: [DentistEstablishmentController],
  providers: [DentistEstablishmentService, ErrorService],
  exports: [DentistEstablishmentService],
})
export class DentistEstablishmentModule {}
