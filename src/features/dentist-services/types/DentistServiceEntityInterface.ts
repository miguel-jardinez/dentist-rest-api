import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';

export interface DentistServiceEntityInterface {
  id?: string;
  name: string;
  description: string;
  amount: number;
  // establishment: EstablishmentAddressEntity;
  currencyCode: string;
  averageTime: string;
  createdAt: string;
  updatedAt: string;
}
