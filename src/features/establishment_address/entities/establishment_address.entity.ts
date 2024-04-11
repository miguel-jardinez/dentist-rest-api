import { EstablishmentAddressEntityInterface } from '@features/establishment_address/type/EstablishmentAddressEntityInterface';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';
import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';
import { DentistServiceEntity } from '@features/dentist-services/entities/dentist-service.entity';
import { WorkingScheduleEntity } from '@features/working_schedule/entities/working_schedule.entity';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class EstablishmentAddressEntity
  implements EstablishmentAddressEntityInterface
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phoneNumber: string;
  // address: EstablishmentAddressEntity;
  // appointment: AppointmentEntity[];
  // dentist: DentistProfileEntity[];
  // services: DentistServiceEntity[];

  // @OneToMany(
  //   () => WorkingScheduleEntity,
  //   (workingScheduleEntity) => workingScheduleEntity.establishment,
  // )
  // workingSchedule: WorkingScheduleEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
