import { UserEntity } from '@features/users/entities/user.entity';
import { DentistLicenseEntity } from '@features/dentist-license/entities/dentist-license.entity';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';

export interface DentistProfileEntityInterface {
  id?: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  user: UserEntity;
  license: DentistLicenseEntity;
  establishment: DentistEstablishmentEntity;
  appointment: AppointmentEntity;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
