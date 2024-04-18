import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';

export interface WorkingScheduleEntityInterface {
  id?: string;
  day: string;
  beginningWork: string;
  endWork: string;
  // establishment: EstablishmentAddressEntity;
  createdAt: string;
  updatedAt: string;
}
