import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkingDaysEntity } from './working-days.entity';

@Entity('working_hours')
export class WorkingHourEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start_work: string;

  @Column('text')
  end_work: string;

  @OneToOne(() => WorkingDaysEntity, (days) => days.hours, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'working_days_id' })
  days: WorkingDaysEntity;
}
