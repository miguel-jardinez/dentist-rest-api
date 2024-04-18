import { DentistEstablishmentEntityInterface } from '@features/dentist-establishment/repository/dentistEstablishmentEntity.interface';
import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';
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

  @OneToOne(() => EstablishmentAddressEntity, { nullable: true })
  @ApiProperty({ type: EstablishmentAddressEntity })
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
    { nullable: true },
  )
  @JoinColumn({ name: 'dentist_id' })
  // @ApiProperty({ type: DentistProfileEntity })
  dentist?: DentistProfileEntity;

  @OneToMany(
    () => DentistServiceEntity,
    (dentistServiceEntity) => dentistServiceEntity.establishment,
    { nullable: true },
  )
  // @ApiProperty({ type: DentistServiceEntity })
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
