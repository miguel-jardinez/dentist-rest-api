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

@Entity('customer_address')
export class CustomerAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('point')
  coordinates: Array<string>;

  @ManyToOne(
    () => CustomerProfileEntity,
    (customerProfileEntity) => customerProfileEntity.address,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'customer_profile_id' })
  customer: CustomerProfileEntity;

  @Column('text', { name: 'interior_number' })
  interiorNumber: string;

  @Column('text')
  neighborhood: string;

  @Column('text')
  state: string;

  @Column('text', { name: 'street_name' })
  streetName: string;

  @Column('text', { name: 'street_number' })
  streetNumber: string;

  @Column('text', { name: 'zip_code' })
  zipCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
