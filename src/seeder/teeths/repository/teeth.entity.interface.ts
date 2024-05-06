import { ToothQuadrantEnum } from '@seeder/teeths/utils/ToothQuadrantEnum';

export interface TeethEntityInterface {
  id: string;
  quadrant: ToothQuadrantEnum;
  name: string;
  toothNumber: number;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}
