import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { StatesEntity } from '@seeder/states/entities/states.entity';

export interface CustomerAddressModelEntity {
  id: string;
  streetName: string;
  streetNumber: number;
  interiorNumber: number;
  neighborhood: string;
  state: StatesEntity;
  zipCode: number;
  fullAddress: string;
  city: string;
  customer: CustomerProfileEntity;
  createdAt: string;
  updatedAt: string;
}
