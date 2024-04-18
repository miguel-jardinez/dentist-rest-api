import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { AppointmentVitalSignEntity } from '@features/appointment-vital-signs/entities/appointment-vital-sign.entity';

export interface AppointmentEntityInterface {
  id?: string;
  appointmentName: string;
  dentist: DentistProfileEntity;
  customer: CustomerProfileEntity;
  vitalSigns: AppointmentVitalSignEntity;
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
