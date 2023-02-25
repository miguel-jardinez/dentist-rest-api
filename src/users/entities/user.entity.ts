import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../types/UserModel';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { UserRole } from '../../utils/RoleEnum';

@Entity('user')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'text' })
  email: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  username: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: ['remove'],
    nullable: true,
  })
  profile?: ProfileEntity;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_active: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_phone_verified: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_email_verified: boolean;

  @Column({ enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_date_time: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  last_changed_date_time: Date;

  @BeforeInsert()
  async hashPassword?() {
    this.password = await hash(this.password);
  }
}
