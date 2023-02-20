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
  state?: string;

  @Column('text', { nullable: true })
  country?: string;

  @Column('boolean', { default: false })
  is_default: boolean;

  @ManyToOne(() => ProfileEntity, (profile) => profile.address, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'profileid' })
  profile: ProfileEntity;

  constructor(
    id?: string,
    coordinates?: number[],
    full_address?: string,
    address_line?: string,
    postal_code?: string,
    address_number_exterior?: string,
    is_default?: boolean,
    suburb?: string,
    address_number_interior?: string,
    state?: string,
    country?: string,
  );
  constructor(
    id: string,
    coordinates: number[],
    full_address: string,
    address_line: string,
    postal_code: string,
    address_number_exterior: string,
    is_default: boolean,
    suburb?: string,
    address_number_interior?: string,
    state?: string,
    country?: string,
  ) {
    this.id = id;
    this.coordinates = coordinates;
    this.full_address = full_address;
    this.address_line = address_line;
    this.address_number_interior = address_number_interior;
    this.postal_code = postal_code;
    this.address_number_exterior = address_number_exterior;
    this.suburb = suburb;
    this.state = state;
    this.country = country;
    this.is_default = is_default;
  }
}
