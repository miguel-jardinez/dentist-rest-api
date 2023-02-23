import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ProfileInterface } from '../interface/Profile.interface';
import { AddressEntity } from '../../addresses/entities/address.entity';

@Entity('profile')
export class ProfileEntity implements ProfileInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text', { nullable: true })
  phone_number?: string;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userid' })
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.profile, {
    cascade: ['remove'],
  })
  address: AddressEntity[];
}
