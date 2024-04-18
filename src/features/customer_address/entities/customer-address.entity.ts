import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { CustomerAddressModelEntity } from '@features/customer_address/repository/customerAddressModelEntity';
import { StatesEntity } from '@seeder/states/entities/states.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('customer_address')
export class CustomerAddressEntity implements CustomerAddressModelEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ManyToOne(
    () => CustomerProfileEntity,
    (customerProfileEntity) => customerProfileEntity.address,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'customer_profile_id' })
  customer: CustomerProfileEntity;

  @Column('int', { name: 'interior_number', nullable: true })
  @ApiProperty({ name: 'interior_number' })
  interiorNumber: number;

  @Column('text')
  @ApiProperty()
  neighborhood: string;

  @OneToOne(() => StatesEntity)
  @JoinColumn({ name: 'state_id' })
  @ApiProperty({ type: StatesEntity })
  state: StatesEntity;

  @Column('text')
  @ApiProperty()
  city: string;

  @Column('varchar', { name: 'full_address' })
  @ApiProperty({ name: 'full_address' })
  fullAddress: string;

  @Column('text', { name: 'street_name' })
  @ApiProperty({ name: 'street_name' })
  streetName: string;

  @Column('int', { name: 'street_number' })
  @ApiProperty({ name: 'street_number' })
  streetNumber: number;

  @Column('int', { name: 'zip_code' })
  @ApiProperty({ name: 'zip_code' })
  zipCode: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt: string;
}
