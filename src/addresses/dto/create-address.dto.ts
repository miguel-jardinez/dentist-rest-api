import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsArray()
  @IsNotEmpty()
  coordinates: number[];

  @IsString()
  @IsNotEmpty()
  full_address: string;

  @IsString()
  @IsOptional()
  suburb?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  address_line: string;

  @IsString()
  iso_code: string;

  @IsString()
  @IsOptional()
  address_number_interior?: string;

  @IsString()
  @IsNotEmpty()
  address_number_exterior: string;
}
