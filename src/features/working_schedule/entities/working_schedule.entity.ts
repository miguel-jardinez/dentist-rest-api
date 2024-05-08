import { WorkingScheduleEntityInterface } from '@features/working_schedule/type/WorkingScheduleEntityInterface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { DaysOfWeek } from '@features/working_schedule/utils/DaysOfWeek';

@Entity('working_schedule')
export class WorkingScheduleEntity implements WorkingScheduleEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'time',
    default: () => "'00:00'",
  })
  beginningWork: string;

  @Column('enum', { default: DaysOfWeek.SUNDAY, enum: DaysOfWeek })
  day: DaysOfWeek;

  @Column({
    type: 'time',
    default: () => "'00:00'",
  })
  endWork: string;

  @Column('boolean')
  enabledToWork: boolean;

  @ManyToOne(
    () => DentistEstablishmentEntity,
    (dentistEstablishmentEntity) => dentistEstablishmentEntity.workingSchedule,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'establishment_id' })
  establishment: DentistEstablishmentEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
