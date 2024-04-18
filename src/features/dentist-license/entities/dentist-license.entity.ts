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
import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('dentist_license')
export class DentistLicenseEntity implements LicenseEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('varchar', { name: 'license_college' })
  @ApiProperty({ name: 'license_college' })
  licenseCollege: string;

  @ManyToOne(
    () => DentistProfileEntity,
    (dentistProfileEntity) => dentistProfileEntity.license,
    { nullable: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'dentist_id' })
  dentistProfile: DentistProfileEntity;

  @Column('varchar', { name: 'license_number' })
  @ApiProperty({ name: 'license_number' })
  licenseNumber: string;

  @Column('varchar', { name: 'license_year' })
  @ApiProperty({ name: 'license_year' })
  licenseYear: string;

  @Column('varchar', { name: 'license_degree' })
  @ApiProperty({ name: 'license_degree' })
  licenseDegree: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt: string;
}
