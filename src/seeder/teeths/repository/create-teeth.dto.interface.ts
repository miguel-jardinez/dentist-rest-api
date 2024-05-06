import { ToothQuadrantEnum } from '@seeder/teeths/utils/ToothQuadrantEnum';

export interface CreateTeethDtoInterface {
  quadrant: ToothQuadrantEnum;
  name: string;
  toothNumber: number;
  fullName: string;
}
