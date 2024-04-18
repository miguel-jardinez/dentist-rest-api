import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';
import { WorkingScheduleEntity } from '@features/working_schedule/entities/working_schedule.entity';
import { DentistServiceEntity } from '@features/dentist-services/entities/dentist-service.entity';
import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';

export interface DentistEstablishmentEntityInterface {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  services?: DentistServiceEntity;
  address?: EstablishmentAddressEntity;
  workingSchedule?: WorkingScheduleEntity;
  dentist?: DentistProfileEntity;
  appointment?: AppointmentEntity;
  createdAt: string;
  updatedAt: string;
}
