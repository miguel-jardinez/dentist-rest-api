import { CreateStatesDtoInterface } from '@seeder/states/reposiotory/create-states-dto.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatesDto implements CreateStatesDtoInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
