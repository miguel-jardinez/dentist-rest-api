import { Module } from '@nestjs/common';
import { WorkingHoursService } from './working-hours.service';
import { WorkingHoursController } from './working-hours.controller';
import { ProfileModule } from '../profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingDaysEntity } from './entities/working-days.entity';
import { WorkingHourEntity } from './entities/working-hour.entity';
import { ErrorService } from '../utils/ErrorService';

@Module({
  imports: [
    ProfileModule,
    TypeOrmModule.forFeature([WorkingDaysEntity, WorkingHourEntity]),
  ],
  controllers: [WorkingHoursController],
  providers: [WorkingHoursService, ErrorService],
})
export class WorkingHoursModule {}
