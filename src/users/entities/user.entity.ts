import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../types/UserModel';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
