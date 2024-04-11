import { WorkingScheduleEntityInterface } from '@features/working_schedule/type/WorkingScheduleEntityInterface';
import { EstablishmentAddressEntity } from '@features/establishment_address/entities/establishment_address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  // @ManyToOne(
  //   () => EstablishmentAddressEntity,
  //   (establishmentAddressEntity) => establishmentAddressEntity.workingSchedule,
  // )
  // establishment: EstablishmentAddressEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
