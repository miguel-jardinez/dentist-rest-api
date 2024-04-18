import { CreateLicenseDtoInterface } from '@features/dentist-license/repository/createLicenseDto.interface';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLicenseDto implements CreateLicenseDtoInterface {
  @IsString()
  @ApiProperty()
  licenseCollege: string;

  @IsString()
  @ApiProperty()
  licenseNumber: string;

  @IsString()
  @ApiProperty()
  licenseYear: string;
}
