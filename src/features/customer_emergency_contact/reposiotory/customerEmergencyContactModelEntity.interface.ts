import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';

export interface CustomerEmergencyContactModelEntityInterface {
  id: string;
  name: string;
  lastName: string;
  relationship: string;
  email: string;
  phoneNumber: string;
  customerProfile: CustomerProfileEntity;
  createdAt: string;
  updatedAt: string;
}
