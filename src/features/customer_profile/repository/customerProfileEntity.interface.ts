import { UserEntity } from '../../users/entities/user.entity';
import { CustomerEmergencyContactEntity } from '@features/customer_emergency_contact/entities/customerEmergencyContact.entity';
import { CustomerAddressEntity } from '@features/customer_address/entities/customer-address.entity';

export interface CustomerProfileEntityInterface {
  id: string;
  firstName: string;
  address: Array<CustomerAddressEntity>;
  emergencyContacts: Array<CustomerEmergencyContactEntity>;
  lastName: string;
  phoneNumber: string;
  user: UserEntity;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
