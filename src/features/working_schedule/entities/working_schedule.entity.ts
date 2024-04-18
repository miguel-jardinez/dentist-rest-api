import { WorkingScheduleEntityInterface } from '@features/working_schedule/type/WorkingScheduleEntityInterface';
import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';

@Entity('working_schedule')
export class WorkingScheduleEntity implements WorkingScheduleEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  beginningWork: string;

  @Column('varchar')
  day: string;

  @Column('text')
  endWork: string;

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
