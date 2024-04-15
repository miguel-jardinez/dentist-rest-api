import { GetLicenseDtoInterface } from '@features/dentist-license/repository/getLicenseDto.interface';
import { IsString } from 'class-validator';

export class GetLicenseDto implements GetLicenseDtoInterface {
  @IsString()
  name: string;

  @IsString()
  licenseNumber: string;

  @IsString()
  motherLastName: string;

  @IsString()
  fatherLastName: string;
}
