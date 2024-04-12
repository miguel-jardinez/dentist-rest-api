import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';

export interface CustomerAddressModelEntity {
  id: string;
  streetName: string;
  streetNumber: number;
  interiorNumber: number;
  neighborhood: string;
  state: string;
  zipCode: number;
  fullAddress: string;
  city: string;
  stateCode: string;
  customer: CustomerProfileEntity;
  createdAt: string;
  updatedAt: string;
}
