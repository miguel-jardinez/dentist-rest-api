import { IsOptional, IsString } from 'class-validator';

export class CreateWorkingScheduleDto {
  @IsString()
  beginningWork: string
  @IsString()
  endWork: string
  @IsOptional()
  enabledToWork: boolean
}
