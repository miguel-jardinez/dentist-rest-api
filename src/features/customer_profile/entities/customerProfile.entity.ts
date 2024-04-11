import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@features/users/entities/user.entity';
import { CustomerEmergencyContactEntity } from '@features/customer_emergency_contact/entities/customerEmergencyContact.entity';
import { CustomerAddressEntity } from '@features/customer_address/entities/customer-address.entity';
import { CustomerProfileEntityInterface } from '@features/customer_profile/repository/customerProfileEntity.interface';

@Entity('customer_profile')
export class CustomerProfileEntity implements CustomerProfileEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'first_name', nullable: true })
  firstName: string;

  @Column('varchar', { name: 'last_name', nullable: true })
  lastName: string;

  @Column('varchar', { name: 'phone_number', nullable: true })
  phoneNumber: string;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.customerProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('boolean', { name: 'is_active', default: false })
  isActive: boolean;

  @OneToMany(
    () => CustomerAddressEntity,
    (customerAddressEntity) => customerAddressEntity.customer,
    { nullable: true },
  )
  address: Array<CustomerAddressEntity>;

  @OneToMany(
    () => CustomerEmergencyContactEntity,
    (customerEmergencyContactEntity) =>
      customerEmergencyContactEntity.customerProfile,
    { nullable: true },
  )
  emergencyContacts: Array<CustomerEmergencyContactEntity>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
