import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@features/users/entities/user.entity';
import { CustomerEmergencyContactEntity } from '@features/customer_emergency_contact/entities/customerEmergencyContact.entity';
import { CustomerAddressEntity } from '@features/customer_address/entities/customer-address.entity';
import { CustomerProfileEntityInterface } from '@features/customer_profile/repository/customerProfileEntity.interface';
import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('customer_profile')
export class CustomerProfileEntity implements CustomerProfileEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('varchar', { name: 'first_name', nullable: true })
  @ApiProperty({ name: 'first_name' })
  firstName: string;

  @Column('varchar', { name: 'last_name', nullable: true })
  @ApiProperty({ name: 'last_name' })
  lastName: string;

  @Column('varchar', { name: 'phone_number', nullable: true })
  @ApiProperty({ name: 'phone_number' })
  phoneNumber: string;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.customerProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  @ManyToOne(
    () => AppointmentEntity,
    (appointmentEntity) => appointmentEntity.customer,
  )
  @ApiProperty({ type: AppointmentEntity })
  appointment: AppointmentEntity;

  @Column('boolean', { name: 'is_active', default: false })
  @ApiProperty({ name: 'is_active' })
  isActive: boolean;

  @OneToMany(
    () => CustomerAddressEntity,
    (customerAddressEntity) => customerAddressEntity.customer,
    { nullable: true },
  )
  @ApiProperty({ type: CustomerAddressEntity, isArray: true })
  address: Array<CustomerAddressEntity>;

  @OneToMany(
    () => CustomerEmergencyContactEntity,
    (customerEmergencyContactEntity) =>
      customerEmergencyContactEntity.customerProfile,
    { nullable: true },
  )
  @ApiProperty({
    type: CustomerEmergencyContactEntity,
    isArray: true,
    name: 'emergency_contacts',
  })
  emergencyContacts: Array<CustomerEmergencyContactEntity>;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt: string;
}
