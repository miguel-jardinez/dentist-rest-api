import { DentistProfileEntityDtoInterface } from '@features/dentist-profile/repository/dentistProfileEntityDto.interface';
import { IsOptional, IsString, MaxLength } from 'class-validator';

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
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  phoneNumber: string;
}
