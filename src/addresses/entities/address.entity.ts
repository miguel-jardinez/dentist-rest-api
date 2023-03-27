import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'simple-array' })
  coordinates: number[];

  @Column('text')
  full_address: string;

  @Column('text')
  address_line: string;

  @Column('text', { nullable: true })
  address_number_interior?: string;

  @Column('text')
  postal_code: string;

  @Column('text')
  address_number_exterior: string;

  @Column('text', { nullable: true })
  suburb?: string;

  @Column('text', { nullable: true })
  country?: string;

  @Column('text')
  iso_code: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.address, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
    nullable: false,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
