import { Module } from '@nestjs/common';
import { WorkingScheduleController } from '@features/working_schedule/working_schedule.controller';
import { WorkingScheduleService } from '@features/working_schedule/working_schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingScheduleEntity } from '@features/working_schedule/entities/working_schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingScheduleEntity])],
  controllers: [WorkingScheduleController],
  providers: [WorkingScheduleService],
  exports: [WorkingScheduleService],
})
export class WorkingScheduleModule {}
