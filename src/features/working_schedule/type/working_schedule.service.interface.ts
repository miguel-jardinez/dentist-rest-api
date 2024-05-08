import { UpdateWorkingScheduleDto } from '@features/working_schedule/dto/update-working_schedule.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { UpdateResult } from 'typeorm';
import { WorkingScheduleEntity } from '@features/working_schedule/entities/working_schedule.entity';

export interface WorkingScheduleServiceInterface {
  updateWorkingSchedule: (
    establishmentId: string,
    workingDayId: string,
    updateWorkingSchedule: UpdateWorkingScheduleDto
  ) => Promise<ResponseApi<UpdateResult>>
  getWorkingSchedule: (establishmentId: string) => Promise<ResponseApi<Array<WorkingScheduleEntity>>>
  getOneWorkingSchedule: (establishmentId: string, workingScheduleId: string) => Promise<ResponseApi<WorkingScheduleEntity>>
  createWorkingSchedule: (establishmentId: string) => Promise<ResponseApi<Array<WorkingScheduleEntity>>>
}
