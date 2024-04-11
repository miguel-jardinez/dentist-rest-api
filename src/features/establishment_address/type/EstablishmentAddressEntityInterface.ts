import { EstablishmentAddressEntity } from '@features/establishment_address/entities/establishment_address.entity';
import { DentistServiceEntity } from '@features/dentist-services/entities/dentist-service.entity';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';
import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';
import { WorkingScheduleEntity } from '@features/working_schedule/entities/working_schedule.entity';

export interface EstablishmentAddressEntityInterface {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  // address: EstablishmentAddressEntity;
  // services: DentistServiceEntity[];
  // appointment: AppointmentEntity[];
  // dentist: DentistProfileEntity[];
  // workingSchedule: WorkingScheduleEntity[];
  createdAt: string;
  updatedAt: string;
}
