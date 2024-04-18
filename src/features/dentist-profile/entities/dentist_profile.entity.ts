import { DentistProfileEntityInterface } from '@features/dentist-profile/types/DentistProfileEntityInterface';
import { UserEntity } from '@features/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DentistLicenseEntity } from '@features/dentist-license/entities/dentist-license.entity';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('dentist_profile')
export class DentistProfileEntity implements DentistProfileEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('varchar', { nullable: true })
  @ApiProperty()
  avatar: string;

  @Column('varchar', { name: 'is_active', default: false })
  @ApiProperty()
  isActive: boolean;

  @Column('varchar', { name: 'last_name', nullable: true })
  @ApiProperty({ name: 'last_name' })
  lastName: string;

  @OneToMany(
    () => DentistLicenseEntity,
    (licenseEntity) => licenseEntity.dentistProfile,
    { nullable: true, onDelete: 'CASCADE' },
  )
  @ApiProperty({ type: DentistLicenseEntity })
  license: DentistLicenseEntity;

  @Column('varchar', { nullable: true })
  @ApiProperty()
  name: string;

  @Column('varchar', { name: 'phone_number', nullable: true })
  @ApiProperty()
  phoneNumber: string;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.dentistProfile, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: UserEntity })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(
    () => DentistEstablishmentEntity,
    (dentistEstablishmentEntity) => dentistEstablishmentEntity.dentist,
  )
  @ApiProperty({ type: DentistEstablishmentEntity })
  establishment: DentistEstablishmentEntity;

  @OneToMany(
    () => AppointmentEntity,
    (appointmentEntity) => appointmentEntity.dentist,
  )
  @ApiProperty({ type: AppointmentEntity })
  appointment: AppointmentEntity;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt: string;
}
