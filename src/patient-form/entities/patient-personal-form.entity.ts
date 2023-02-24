import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('personal_form')
export class PatientPersonalFormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.personal_form, {
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
