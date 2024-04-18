import { GetLicenseDtoInterface } from '@features/dentist-license/repository/getLicenseDto.interface';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLicenseDto implements GetLicenseDtoInterface {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  licenseNumber: string;

  @IsString()
  @ApiProperty()
  motherLastName: string;

  @IsString()
  @ApiProperty()
  fatherLastName: string;
}
