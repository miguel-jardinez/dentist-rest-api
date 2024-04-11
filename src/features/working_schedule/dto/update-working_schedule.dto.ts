import { PartialType } from '@nestjs/swagger';
import { CreateWorkingScheduleDto } from './create-working_schedule.dto';

export class UpdateWorkingScheduleDto extends PartialType(CreateWorkingScheduleDto) {}
