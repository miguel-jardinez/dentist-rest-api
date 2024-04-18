import { AppointmentEntityInterface } from '@features/appointment/type/AppointmentEntityInterface';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { AppointmentVitalSignEntity } from '@features/appointment-vital-signs/entities/appointment-vital-sign.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('appointment')
export class AppointmentEntity implements AppointmentEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('double precision')
  @ApiProperty()
  amount: number;

  @Column('varchar', { name: 'appointment_date' })
  @ApiProperty()
  appointmentDate: string;

  @Column('varchar', { name: 'appointment_description' })
  @ApiProperty()
  appointmentDescription: string;

  @Column('varchar', { name: 'appointment_name' })
  @ApiProperty()
  appointmentName: string;

  @Column('varchar', { name: 'average_time' })
  @ApiProperty()
  averageTime: string;

  @Column('varchar', { name: 'currency_code' })
  @ApiProperty()
  currencyCode: string;

  @ManyToOne(
    () => CustomerProfileEntity,
    (customerProfileEntity) => customerProfileEntity.appointment,
  )
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerProfileEntity;

  @ManyToOne(
    () => DentistProfileEntity,
    (dentistProfileEntity) => dentistProfileEntity.appointment,
  )
  @JoinColumn({ name: 'dentist_id' })
  dentist: DentistProfileEntity;

  @ManyToOne(
    () => DentistEstablishmentEntity,
    (dentistEstablishmentEntity) => dentistEstablishmentEntity.appointment,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'establishment_id' })
  establishment: DentistEstablishmentEntity;

  @Column('varchar', { name: 'is_paid' })
  @ApiProperty()
  @ApiProperty({ name: 'is_paid' })
  isPaid: boolean;

  @Column('varchar', { name: 'payment_state' })
  @ApiProperty({ name: 'payment_state' })
  paymentState: string;

  @Column('varchar', { name: 'sub_total' })
  @ApiProperty()
  subtotal: number;

  @Column('double precision')
  @ApiProperty()
  taxes: number;

  @OneToOne(
    () => AppointmentVitalSignEntity,
    (vitalSignEntity) => vitalSignEntity.appointment,
  )
  @ApiProperty({ type: AppointmentVitalSignEntity })
  vitalSigns: AppointmentVitalSignEntity;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt: string;
}
