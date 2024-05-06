import { TeethEntityInterface } from '@seeder/teeths/repository/teeth.entity.interface';

import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ToothQuadrantEnum } from '@seeder/teeths/utils/ToothQuadrantEnum';

export class TeethEntity implements TeethEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('enum', { default: ToothQuadrantEnum.MNRQ })
  quadrant: ToothQuadrantEnum;
  @Column('text')
  name: string;
  @Column('int')
  toothNumber: number;
  @Column('text')
  fullName: string;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
