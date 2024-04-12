import {
  CreateCustomerAddressDtoInterface
} from '@features/customer_address/repository/createCustomerAddressDto.interface';
import { IsArray, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateCustomerAddressDto implements CreateCustomerAddressDtoInterface {
  @IsString()
  @Length(3, 150)
  city: string;

  @IsNumber()
  @IsOptional()
  interiorNumber: number;

  @IsString()
  neighborhood: string;

  @IsString()
  state: string;

  @IsString()
  streetName: string;

  @IsNumber()
  streetNumber: number;

  @IsNumber()
  zipCode: number;

  @IsString()
  fullAddress: string;

  @IsString()
  stateCode: string;
}
