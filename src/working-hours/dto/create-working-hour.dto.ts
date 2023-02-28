import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumDays } from '../types/EnumDays';

export class CreateWorkingHourDto {
  @IsEnum(EnumDays)
  @IsString()
  @IsNotEmpty()
  day: EnumDays;

  @IsString()
  @IsNotEmpty()
  start_work: string;

  @IsString()
  @IsNotEmpty()
  end_work: string;
}
