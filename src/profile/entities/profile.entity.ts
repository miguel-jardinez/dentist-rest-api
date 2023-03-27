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
import { UserEntity } from '../../users/entities/user.entity';
import { ProfileInterface } from '../interface/Profile.interface';
import { AddressEntity } from '../../addresses/entities/address.entity';
import { DentistServiceEntity } from '../../dentist-services/entities/dentist-service.entity';
import { PatientRelativesFormEntity } from '../../patient-form/entities/patient-relatives-form.entity';
import { PatientPersonalFormEntity } from '../../patient-form/entities/patient-personal-form.entity';
import { ProfessionalLicenseEntity } from '../../professional-license/entities/professional-license.entity';
import { WorkingDaysEntity } from '../../working-hours/entities/working-days.entity';

@Entity('profile')
export class ProfileEntity implements ProfileInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  father_last_name: string;

  @Column('text', { nullable: true })
  mother_last_name: string;

  @Column('text', { nullable: true })
  phone_number?: string;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userid' })
  user: UserEntity;

  @OneToMany(() => AddressEntity, (address) => address.profile, {
    cascade: ['remove'],
    nullable: true,
  })
  address?: AddressEntity[];

  @OneToMany(() => DentistServiceEntity, (service) => service.profile, {
    cascade: ['remove'],
    nullable: true,
  })
  services?: DentistServiceEntity[];

  @OneToOne(() => PatientRelativesFormEntity, (form) => form.profile, {
    cascade: ['remove'],
    nullable: true,
  })
  relatives_form?: PatientRelativesFormEntity;

  @OneToOne(() => PatientPersonalFormEntity, (form) => form.profile, {
    cascade: ['remove'],
    nullable: true,
  })
  personal_form?: PatientPersonalFormEntity;

  @OneToOne(() => ProfessionalLicenseEntity, (license) => license.profile, {
    cascade: ['remove'],
    nullable: true,
  })
  license?: ProfessionalLicenseEntity;

  @OneToMany(() => WorkingDaysEntity, (days) => days.profile, {
    nullable: true,
    cascade: ['remove'],
  })
  working_days?: WorkingDaysEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date_time: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_changed_date_time: Date;
}
