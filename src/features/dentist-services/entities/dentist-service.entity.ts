import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DentistServiceEntityInterface } from '@features/dentist-services/types/DentistServiceEntityInterface';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('dentist_service')
export class DentistServiceEntity implements DentistServiceEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('double precision')
  @ApiProperty()
  amount: number;

  @Column('text', { name: 'average_time' })
  @ApiProperty({ name: 'average_time' })
  averageTime: string;

  @Column({ name: 'currency_code', type: 'varchar', length: 3 })
  @ApiProperty({ name: 'currency_code' })
  currencyCode: string;

  @Column('text')
  @ApiProperty()
  description: string;

  @ManyToOne(
    () => DentistEstablishmentEntity,
    (dentistEstablishmentEntity) => dentistEstablishmentEntity.services,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'establishment_id' })
  establishment: DentistEstablishmentEntity;

  @Column('varchar')
  @ApiProperty()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt: string;
}
