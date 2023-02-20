import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrencyEnum } from '../types/currencyEnum';
import { DentistServiceEntity } from './dentist-service.entity';

@Entity('amount_service')
export class AmountEntityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: CurrencyEnum, default: CurrencyEnum.MXN })
  currency: string;

  @Column({ type: 'bigint' })
  total: number;

  @OneToOne(() => DentistServiceEntity, (service) => service.amount, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'serviceid' })
  service: DentistServiceEntity;
}
