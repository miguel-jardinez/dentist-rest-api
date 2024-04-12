import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';

export interface CreateCustomerAddressDtoInterface {
  streetName: string;
  streetNumber: number;
  interiorNumber: number;
  neighborhood: string;
  state: string;
  zipCode: number;
  city: string;
  fullAddress: string;
  stateCode: string;
}
