import { DentistEstablishmentEntityInterface } from '@features/dentist-establishment/repository/dentistEstablishmentEntity.interface';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';
import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';
import { DentistServiceEntity } from '@features/dentist-services/entities/dentist-service.entity';
import { WorkingScheduleEntity } from '@features/working_schedule/entities/working_schedule.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';

@Entity('dentist_establishment')
export class DentistEstablishmentEntity
  implements DentistEstablishmentEntityInterface
{
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('varchar')
  @ApiProperty()
  email: string;

  @Column('varchar')
  @ApiProperty()
  name: string;

  @Column('varchar', { name: 'phone_number' })
  @ApiProperty({ name: 'phone_number' })
  phoneNumber: string;

  @ApiProperty({ type: EstablishmentAddressEntity })
  @OneToOne(
    () => EstablishmentAddressEntity,
    (establishmentAddressEntity) => establishmentAddressEntity.establishment,
    { nullable: true },
  )
  address?: EstablishmentAddressEntity;

  @OneToMany(
    () => AppointmentEntity,
    (appointmentEntity) => appointmentEntity.establishment,
    { nullable: true },
  )
  appointment?: AppointmentEntity;

  @ManyToOne(
    () => DentistProfileEntity,
    (dentistProfileEntity) => dentistProfileEntity.establishment,
    { nullable: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'dentist_id' })
  dentist?: DentistProfileEntity;

  @OneToMany(
    () => DentistServiceEntity,
    (dentistServiceEntity) => dentistServiceEntity.establishment,
    { nullable: true },
  )
  services?: DentistServiceEntity;

  @OneToMany(
    () => WorkingScheduleEntity,
    (workingScheduleEntity) => workingScheduleEntity.establishment,
    { nullable: true },
  )
  // @ApiProperty({ type: WorkingScheduleEntity })
  workingSchedule: WorkingScheduleEntity;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt: string;
}
