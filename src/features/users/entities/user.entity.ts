import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'argon2';
import { UserRole } from '@utils/RoleEnum';
import { UserModelEntity } from '@features/users/types/UserModelEntity';
import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';

@Entity('user')
export class UserEntity implements UserModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @OneToOne(
    () => CustomerProfileEntity,
    (customerProfileEntity) => customerProfileEntity.user,
    { nullable: true },
  )
  customerProfile?: CustomerProfileEntity;

  @OneToOne(
    () => DentistProfileEntity,
    (dentistProfileEntity) => dentistProfileEntity.user,
    { nullable: true },
  )
  dentistProfile?: DentistProfileEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @BeforeInsert()
  async hashPassword?() {
    this.password = await hash(this.password);
  }
}
