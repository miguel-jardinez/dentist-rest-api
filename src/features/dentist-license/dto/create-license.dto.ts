import { CreateLicenseDtoInterface } from '@features/dentist-license/repository/createLicenseDto.interface';
import { IsString } from 'class-validator';

export class CreateLicenseDto implements CreateLicenseDtoInterface {
  @IsString()
  licenseCollege: string;

  @IsString()
  licenseNumber: string;

  @IsString()
  licenseYear: string;
}
