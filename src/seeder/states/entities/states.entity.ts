import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatesEntityInterface } from '@seeder/states/reposiotory/statesEntity.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity('states')
export class StatesEntity implements StatesEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('varchar')
  @ApiProperty()
  code: string;

  @Column('varchar')
  @ApiProperty()
  name: string;

  @Column('varchar')
  @ApiProperty()
  country: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;
}
