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
import { ApiProperty } from '@nestjs/swagger';

@Entity('customer_emergency_contact')
export class CustomerEmergencyContactEntity
  implements CustomerEmergencyContactModelEntityInterface
{
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => CustomerProfileEntity,
    (customerProfileEntity) => customerProfileEntity.emergencyContacts,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'customer_profile_id' })
  customerProfile: CustomerProfileEntity;

  @ApiProperty()
  @Column('varchar')
  email: string;

  @ApiProperty()
  @Column('varchar')
  name: string;

  @ApiProperty({ name: 'last_name' })
  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @ApiProperty({ name: 'phone_number' })
  @Column('varchar', { name: 'phone_number' })
  phoneNumber: string;

  @ApiProperty()
  @Column('varchar')
  relationship: string;

  @ApiProperty({ name: 'created_at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty({ name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
