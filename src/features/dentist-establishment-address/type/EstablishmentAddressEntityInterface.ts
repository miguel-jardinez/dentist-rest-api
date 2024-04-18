import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { StatesEntity } from '@seeder/states/entities/states.entity';

export interface EstablishmentAddressEntityInterface {
  id: string;
  streetName: string;
  streetNumber: number;
  interiorNumber?: number;
  neighborhood: string;
  state: StatesEntity;
  zipCode: number;
  fullAddress: string;
  city: string;
  coordinates: Array<number>;
  establishment: DentistEstablishmentEntity;
  createdAt: string;
  updatedAt: string;
}
