import { UserRole } from '@utils/RoleEnum';
import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';

export interface UserModelEntity {
  id?: string;
  email: string;
  password: string;
  role: UserRole;
  dentistProfile?: DentistProfileEntity;
  customerProfile?: CustomerProfileEntity;
  createdAt: string;
  updatedAt: string;
}
