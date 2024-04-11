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
import { CustomerEmergencyContactModelEntityInterface } from '@features/customer_emergency_contact/reposiotory/customerEmergencyContactModelEntity.interface';

@Entity('customer_emergency_contact')
export class CustomerEmergencyContactEntity
  implements CustomerEmergencyContactModelEntityInterface
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => CustomerProfileEntity,
    (customerProfileEntity) => customerProfileEntity.emergencyContacts,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'customer_profile_id' })
  customerProfile: CustomerProfileEntity;

  @Column('varchar')
  email: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @Column('varchar', { name: 'phone_number' })
  phoneNumber: string;

  @Column('varchar')
  relationship: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
