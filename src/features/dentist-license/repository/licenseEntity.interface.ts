import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';

export interface LicenseEntityInterface {
  id: string;
  licenseNumber: string;
  licenseYear: string;
  licenseCollege: string;
  licenseDegree: string;
  dentistProfile: DentistProfileEntity;
  createdAt: string;
  updatedAt: string;
}
