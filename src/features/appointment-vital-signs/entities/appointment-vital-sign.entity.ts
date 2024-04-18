import { AppointmentVitalSignEntityInterface } from '@features/appointment-vital-signs/repository/appointment-vital-sign-entity.interface';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('appointment_vital_signs')
export class AppointmentVitalSignEntity
  implements AppointmentVitalSignEntityInterface
{
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @OneToOne(() => AppointmentEntity)
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
