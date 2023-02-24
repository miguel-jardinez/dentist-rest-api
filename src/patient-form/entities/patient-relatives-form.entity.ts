import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('relatives_form')
export class PatientRelativesFormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
