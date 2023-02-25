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
  has_cancer: boolean;

  @Column('text', { nullable: true })
  cancer_comments?: string;

  @Column('boolean')
  has_diabetes: boolean;

  @Column('text', { nullable: true })
  diabetes_comments?: string;

  @Column('boolean')
  has_heart_disease: boolean;

  @Column('text', { nullable: true })
  heart_disease_comments?: string;

  @Column('boolean')
  has_kidney_diseases: boolean;

  @Column('text', { nullable: true })
  kidney_diseases_comments?: string;

  @Column('boolean')
  has_liver_diseases: boolean;

  @Column('text', { nullable: true })
  liver_diseases_comments?: string;

  @Column('boolean')
  has_respiratory_diseases: boolean;

  @Column('text', { nullable: true })
  respiratory_diseases_comments?: string;

  @Column('boolean')
  has_metabolic_syndrome: boolean;

  @Column('text', { nullable: true })
  metabolic_syndrome_comments?: string;

  @Column('boolean')
  has_bone_or_joint_problems: boolean;

  @Column('text', { nullable: true })
  bone_or_joint_problems_comments?: string;

  @Column('boolean')
  has_autoimmune_diseases: boolean;

  @Column('text', { nullable: true })
  autoimmune_diseases_comments?: string;

  @Column('boolean')
  has_pregnant: boolean;

  @Column('text', { nullable: true })
  pregnant_comments?: string;

  @Column('boolean')
  has_ever_used_drugs: boolean;

  @Column('text', { nullable: true })
  used_drugs_comments?: string;

  @Column('boolean')
  has_gastrointestinal_disorders: boolean;

  @Column('text', { nullable: true })
  gastrointestinal_disorders_comments?: string;

  @Column('boolean')
  has_endocrine_diseases: boolean;

  @Column('text', { nullable: true })
  endocrine_diseases_comments?: string;

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
