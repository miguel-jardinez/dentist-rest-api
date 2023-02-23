import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../types/UserModel';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { UserRole } from '../../utils/RoleEnum';
import { DentistServiceEntity } from '../../dentist-services/entities/dentist-service.entity';

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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: ['remove'],
  })
  profile: ProfileEntity;

  @Column({ enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @OneToMany(() => DentistServiceEntity, (service) => service.user, {
    cascade: ['remove'],
  })
  services: DentistServiceEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
