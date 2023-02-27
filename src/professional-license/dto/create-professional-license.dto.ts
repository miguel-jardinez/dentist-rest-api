import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfessionalLicenseDto {
  @IsString()
  @IsNotEmpty()
  id_license: string;
}
