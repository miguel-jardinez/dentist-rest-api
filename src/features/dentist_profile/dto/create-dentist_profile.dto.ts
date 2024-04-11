import { DentistProfileEntityDtoInterface } from '@features/dentist_profile/repository/dentistProfileEntityDto.interface';
import { IsOptional, IsString } from 'class-validator';

export class CreateDentistProfileDto
  implements DentistProfileEntityDtoInterface
{
  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  isActive: boolean;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  licenceUrl: string;

  @IsOptional()
  @IsString()
  license: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;
}
