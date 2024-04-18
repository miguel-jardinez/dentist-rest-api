import { StatesEntity } from '@seeder/states/entities/states.entity';

export interface CreateCustomerAddressDtoInterface {
  streetName: string;
  streetNumber: number;
  interiorNumber: number;
  neighborhood: string;
  state: StatesEntity;
  zipCode: number;
  city: string;
  fullAddress: string;
}
