import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { CustomerAddressModelEntity } from '@features/customer_address/repository/customerAddressModelEntity';

@Entity('customer_address')
export class CustomerAddressEntity implements CustomerAddressModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => CustomerProfileEntity,
    (customerProfileEntity) => customerProfileEntity.address,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'customer_profile_id' })
  customer: CustomerProfileEntity;

  @Column('int', { name: 'interior_number', nullable: true })
  interiorNumber: number;

  @Column('text')
  neighborhood: string;

  @Column('text')
  state: string;

  @Column('text')
  city: string;

  @Column('varchar')
  fullAddress: string;

  @Column('varchar')
  stateCode: string;

  @Column('text', { name: 'street_name' })
  streetName: string;

  @Column('int', { name: 'street_number' })
  streetNumber: number;

  @Column('int', { name: 'zip_code' })
  zipCode: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
