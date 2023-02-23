import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsBoolean()
  @IsNotEmpty()
  is_default: boolean;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsNotEmpty()
  address_number_interior: string;

  @IsString()
  @IsOptional()
  address_number_exterior?: string;
}
