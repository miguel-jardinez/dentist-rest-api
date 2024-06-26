import {
  EstablishmentAddressEntityInterface,
} from '@features/dentist-establishment-address/type/EstablishmentAddressEntityInterface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { StatesEntity } from '@seeder/states/entities/states.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('dentist_establishment_address')
export class EstablishmentAddressEntity
  implements EstablishmentAddressEntityInterface
{
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('varchar', { nullable: true })
  @ApiProperty()
  city: string;

  @Column('varchar', { name: 'full_address', nullable: true })
  @ApiProperty({ name: 'full_address' })
  fullAddress: string;

  @Column('varchar', { name: 'interior_number', nullable: true })
  @ApiProperty({ name: 'interior_number' })
  interiorNumber?: number;

  @Column('varchar', { nullable: true })
  @ApiProperty()
  neighborhood: string;

  @OneToOne(() => StatesEntity, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  @ApiProperty()
  state: StatesEntity;

  @Column('varchar', { name: 'street_name', nullable: true })
  @ApiProperty({ name: 'street_name' })
  streetName: string;

  @Column('varchar', { name: 'street_number', nullable: true })
  @ApiProperty({ name: 'street_number' })
  streetNumber: number;

  @Column('varchar', { name: 'zip_code', nullable: true })
  @ApiProperty({ name: 'zip_code' })
  zipCode: number;

  @Column('point', { nullable: true })
  @ApiProperty({ name: 'coordinates', type: Array<number>, default: [0, 0] })
  coordinates: string;

  @OneToOne(
    () => DentistEstablishmentEntity,
    (dentistEstablishmentEntity) => dentistEstablishmentEntity.address,
    { nullable: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'establishment_id' })
  establishment: DentistEstablishmentEntity;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt: string;
}
