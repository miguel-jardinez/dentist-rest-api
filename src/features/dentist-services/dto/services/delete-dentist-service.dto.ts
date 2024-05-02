import { IsArray, IsString } from 'class-validator';
import { DeleteDentistServiceServiceDto } from '@features/dentist-services/repository/delete-dentist-service.service.dto';

export class DeleteDentistServiceDto implements DeleteDentistServiceServiceDto {
  @IsArray()
  @IsString({ each: true })
  idServices: Array<string>;
}
