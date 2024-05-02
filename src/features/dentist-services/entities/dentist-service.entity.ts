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
import { ApiProperty } from '@nestjs/swagger';
import { DentistServiceEntityInterface } from '@features/dentist-services/repository/dentist-service.entity.interface';

@Entity('dentist_service')
export class DentistServiceEntity implements DentistServiceEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

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
