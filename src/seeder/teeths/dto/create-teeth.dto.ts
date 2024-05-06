import { CreateTeethDtoInterface } from '@seeder/teeths/repository/create-teeth.dto.interface';
import { ToothQuadrantEnum } from '@seeder/teeths/utils/ToothQuadrantEnum';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTeethDto implements CreateTeethDtoInterface {
  @IsString()
  fullName: string;
  @IsString()
  name: string;
  @IsEnum(ToothQuadrantEnum)
  quadrant: ToothQuadrantEnum;
  @IsNumber()
  toothNumber: number;
}
