import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';

export interface CustomerAddressModelEntity {
  id: string;
  streetName: string;
  streetNumber: string;
  interiorNumber: string;
  neighborhood: string;
  state: string;
  zipCode: string;
  coordinates: Array<string>;
  customer: CustomerProfileEntity;
  createdAt: string;
  updatedAt: string;
}
