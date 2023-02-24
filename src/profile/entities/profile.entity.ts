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
import { UserEntity } from '../../users/entities/user.entity';
import { ProfileInterface } from '../interface/Profile.interface';
import { AddressEntity } from '../../addresses/entities/address.entity';
import { DentistServiceEntity } from '../../dentist-services/entities/dentist-service.entity';
import { PatientRelativesFormEntity } from '../../patient-form/entities/patient-relatives-form.entity';
import { PatientPersonalFormEntity } from '../../patient-form/entities/patient-personal-form.entity';

@Entity('profile')
export class ProfileEntity implements ProfileInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text', { nullable: true })
  phone_number?: string;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userid' })
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.profile, {
    cascade: ['remove'],
  })
  address: AddressEntity[];

  @OneToMany(() => DentistServiceEntity, (service) => service.profile, {
    cascade: ['remove'],
  })
  services: DentistServiceEntity[];

  @OneToOne(() => PatientRelativesFormEntity, (form) => form.profile, {
    cascade: ['remove'],
  })
  relatives_form: PatientRelativesFormEntity;

  @OneToOne(() => PatientPersonalFormEntity, (form) => form.profile, {
    cascade: ['remove'],
  })
  personal_form: PatientPersonalFormEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date_time: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_changed_date_time: Date;
}
