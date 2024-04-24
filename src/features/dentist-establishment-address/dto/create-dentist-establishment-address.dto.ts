import { CreateDentistEstablishmentAddressDtoInterface } from '@features/dentist-establishment-address/type/create-dentist-establishment-address-dto.interface';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDentistEstablishmentAddressDto
  implements CreateDentistEstablishmentAddressDtoInterface
{
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsArray()
  coordinates: Array<number>;

  @IsString()
  @IsNotEmpty()
  establishmentId: string;

  @IsString()
  @IsNotEmpty()
  fullAddress: string;

  @IsString()
  @IsOptional()
  interiorNumber: number;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  stateId: string;

  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsString()
  @IsNotEmpty()
  streetNumber: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  zipCode: number;
}
