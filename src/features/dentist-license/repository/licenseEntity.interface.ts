import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';

export interface LicenseEntityInterface {
  id: string;
  licenseNumber: string;
  licenseYear: string;
  licenseCollege: string;
  dentistProfile: DentistProfileEntity;
  createdAt: string;
  updatedAt: string;
}
