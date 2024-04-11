import { AppointmentEntityInterface } from '@features/appointment/type/AppointmentEntityInterface';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';
import { EstablishmentAddressEntity } from '@features/establishment_address/entities/establishment_address.entity';
import { PaymentMethodEntity } from '@features/payment_methods/entities/payment_method.entity';
import { VitalSignEntity } from '@features/vital_signs/entities/vital_sign.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointment')
export class AppointmentEntity implements AppointmentEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('double precision')
  amount: number;
  @Column('varchar', { name: 'appointment_date' })
  appointmentDate: string;
  @Column('varchar', { name: 'appointment_description' })
  appointmentDescription: string;
  @Column('varchar', { name: 'appointment_name' })
  appointmentName: string;
  @Column('varchar', { name: 'average_time' })
  averageTime: string;
  @Column('varchar', { name: 'currency_code' })
  currencyCode: string;
  // customer: CustomerProfileEntity;
  // dentist: DentistProfileEntity;
  // establishment: EstablishmentAddressEntity;
  @Column('varchar', { name: 'is_paid' })
  isPaid: boolean;
  // paymentMethod: PaymentMethodEntity;
  @Column('varchar', { name: 'payment_state' })
  paymentState: string;
  @Column('varchar', { name: 'sub_total' })
  subtotal: number;

  @Column('double precision')
  taxes: number;

  @OneToOne(
    () => VitalSignEntity,
    (vitalSignEntity) => vitalSignEntity.appointment,
  )
  vitalSigns: VitalSignEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
