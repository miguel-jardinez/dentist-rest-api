import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { VitalSignEntity } from '@features/vital_signs/entities/vital_sign.entity';
import { PaymentMethodEntity } from '@features/payment_methods/entities/payment_method.entity';
import { EstablishmentAddressEntity } from '@features/establishment_address/entities/establishment_address.entity';

export interface AppointmentEntityInterface {
  id?: string;
  appointmentName: string;
  // dentist: DentistProfileEntity;
  // customer: CustomerProfileEntity;
  vitalSigns: VitalSignEntity;
  // paymentMethod: PaymentMethodEntity;
  // establishment: EstablishmentAddressEntity;
  amount: number;
  currencyCode: string;
  subtotal: number;
  taxes: number;
  appointmentDate: string;
  averageTime: string;
  isPaid: boolean;
  paymentState: string;
  appointmentDescription: string;
  createdAt: string;
  updatedAt: string;
}
