import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AmountEntityEntity } from './amount-entity.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('dentist_service')
export class DentistServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @OneToOne(() => AmountEntityEntity, (amount) => amount.service, {
    cascade: ['remove'],
  })
  amount: AmountEntityEntity;

  @JoinColumn({ name: 'profile_id' })
  @ManyToOne(() => ProfileEntity, (profile) => profile.services, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  profile: ProfileEntity;
}
