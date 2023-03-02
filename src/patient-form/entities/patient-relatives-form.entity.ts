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
import { RelativeFormInterface } from '../interfaces/dto/interface.relatives';
import { RelativesEnum } from '../types/relativesEnum';

@Entity('relatives_form')
export class PatientRelativesFormEntity implements RelativeFormInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  relative_has_asthma: boolean;

  @Column('boolean')
  relative_has_cancer: boolean;

  @Column('boolean')
  relative_has_diabetes: boolean;

  @Column('boolean')
  relative_has_heart_disease: boolean;

  @Column({ type: 'simple-array', enum: RelativesEnum, nullable: true })
  relative_with_asthma?: RelativesEnum[];

  @Column({ type: 'simple-array', enum: RelativesEnum, nullable: true })
  relative_with_cancer?: RelativesEnum[];

  @Column({ type: 'simple-array', enum: RelativesEnum, nullable: true })
  relative_with_diabetes?: RelativesEnum[];

  @Column({ type: 'simple-array', enum: RelativesEnum, nullable: true })
  relative_with_hearth_disease?: RelativesEnum[];

  @Column('boolean')
  relatives_has_respiratory_diseases: boolean;

  @Column('boolean', { nullable: true })
  relative_with_respiratory_diseases?: RelativesEnum[];

  @Column('text', { nullable: true })
  relatives_additional_comments?: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.relatives_form, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date_time: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_changed_date_time: Date;
}
