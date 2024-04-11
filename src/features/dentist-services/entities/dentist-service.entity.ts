import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DentistServiceEntityInterface } from '@features/dentist-services/types/DentistServiceEntityInterface';
import { EstablishmentAddressEntity } from '@features/establishment_address/entities/establishment_address.entity';

@Entity('dentist_service')
export class DentistServiceEntity implements DentistServiceEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('double precision')
  amount: number;
  @Column('text')
  averageTime: string;
  @Column({ name: 'currency_code', type: 'varchar', length: 3 })
  currencyCode: string;
  @Column('text')
  description: string;
  // @OneToMany(
  //   () => EstablishmentAddressEntity,
  //   (establishmentAddressEntity) => establishmentAddressEntity.services,
  // )
  // establishment: EstablishmentAddressEntity;
  @Column('varchar')
  name: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
