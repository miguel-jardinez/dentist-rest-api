import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LicenseEntityInterface } from '@features/dentist-license/repository/licenseEntity.interface';
import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';

@Entity('dentist_license')
export class DentistLicenseEntity implements LicenseEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'license_college' })
  licenseCollege: string;

  @ManyToOne(
    () => DentistProfileEntity,
    (dentistProfileEntity) => dentistProfileEntity.license,
    { nullable: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'dentist_id' })
  dentistProfile: DentistProfileEntity;

  @Column('varchar', { name: 'license_number' })
  licenseNumber: string;

  @Column('varchar', { name: 'license_year' })
  licenseYear: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
