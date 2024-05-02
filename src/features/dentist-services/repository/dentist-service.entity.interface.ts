import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';

export interface DentistServiceEntityInterface {
  id?: string;
  name: string;
  description: string;
  establishment: DentistEstablishmentEntity;
  createdAt: string;
  updatedAt: string;
}
