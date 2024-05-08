import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { DaysOfWeek } from '@features/working_schedule/utils/DaysOfWeek';

export interface WorkingScheduleEntityInterface {
  id: string;
  day: DaysOfWeek;
  beginningWork: string;
  endWork: string;
  establishment: DentistEstablishmentEntity;
  enabledToWork: boolean;
  createdAt: string;
  updatedAt: string;
}
