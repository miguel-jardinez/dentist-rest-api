import { IsNotEmpty, IsString } from 'class-validator';

export class GetLicenseDto {
  @IsString()
  maxResult: string;

  @IsString()
  nombre: string;

  @IsString()
  paterno: string;

  @IsString()
  materno: string;

  @IsString()
  @IsNotEmpty()
  idCedula: string;
}
