import { IsString } from 'class-validator';

export class CreateDentistServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
