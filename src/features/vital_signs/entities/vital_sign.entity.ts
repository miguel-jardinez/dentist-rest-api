import { VitalSignsModelEntity } from '@features/vital_signs/entities/vitalSignsModelEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';

@Entity('vital_signs')
export class VitalSignEntity implements VitalSignsModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    () => AppointmentEntity,
    (appointmentEntity) => appointmentEntity.vitalSigns,
  )
  @JoinColumn({ name: 'appointment_id' })
  appointment: AppointmentEntity;

  @Column('varchar', { name: 'blood_pressure' })
  bloodPressure: string;

  @Column('varchar', { name: 'body_temperature' })
  bodyTemperature: string;

  @Column('varchar', { name: 'oxygenation_saturation' })
  oxygenationSaturation: string;

  @Column('varchar', { name: 'respiratory_rate' })
  respiratoryRate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
