import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkingHourEntity } from './working-hour.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { EnumDays } from '../types/EnumDays';

@Entity('working_days')
export class WorkingDaysEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: EnumDays, type: 'text' })
  day: EnumDays;

  @OneToOne(() => WorkingHourEntity, (hours) => hours.days, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  hours: WorkingHourEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.working_days, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
