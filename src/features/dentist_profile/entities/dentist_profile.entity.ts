import { DentistProfileEntityInterface } from '@features/dentist_profile/types/DentistProfileEntityInterface';
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

@Entity('dentist_profile')
export class DentistProfileEntity implements DentistProfileEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  avatar: string;

  @Column('varchar', { name: 'is_active', default: false })
  isActive: boolean;

  @Column('varchar', { name: 'last_name', nullable: true })
  lastName: string;

  @OneToMany(
    () => DentistLicenseEntity,
    (licenseEntity) => licenseEntity.dentistProfile,
    { nullable: true, onDelete: 'CASCADE' },
  )
  license?: DentistLicenseEntity;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar', { name: 'phone_number', nullable: true })
  phoneNumber: string;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.dentistProfile, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
