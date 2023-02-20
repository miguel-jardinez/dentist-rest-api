import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AmountEntityEntity } from './amount-entity.entity';
import { UserEntity } from '../../users/entities/user.entity';

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

  @ManyToOne(() => UserEntity, (user) => user.services)
  @JoinColumn({ name: 'userid' })
  user: UserEntity;
}
