import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('license')
export class ProfessionalLicenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  id_license: string;

  @Column('text')
  school_degree: string;

  @Column('text')
  degree: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.license, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
