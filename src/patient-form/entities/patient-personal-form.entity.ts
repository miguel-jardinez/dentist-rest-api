import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { PersonalFormInterface } from '../interfaces/dto/interface.personal';

@Entity('personal_form')
export class PatientPersonalFormEntity implements PersonalFormInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  has_asthma: boolean;

  @Column('boolean')
  has_cancer: boolean;

  @Column('boolean')
  has_diabetes: boolean;

  @Column('boolean')
  has_heart_disease: boolean;

  @OneToOne(() => ProfileEntity, (profile) => profile.personal_form, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'profile_id' })
  profile?: ProfileEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date_time?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_changed_date_time?: Date;
}
