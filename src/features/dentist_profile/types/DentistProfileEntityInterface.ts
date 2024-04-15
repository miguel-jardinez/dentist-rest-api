import { UserEntity } from '@features/users/entities/user.entity';
import { DentistLicenseEntity } from '@features/dentist-license/entities/dentist-license.entity';

export interface DentistProfileEntityInterface {
  id?: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  user: UserEntity;
  license?: DentistLicenseEntity;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
