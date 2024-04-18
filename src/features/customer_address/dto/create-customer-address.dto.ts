import { CreateCustomerAddressDtoInterface } from '@features/customer_address/repository/createCustomerAddressDto.interface';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { StatesEntity } from '@seeder/states/entities/states.entity';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class StateDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class CreateCustomerAddressDto
  implements CreateCustomerAddressDtoInterface
{
  @ApiProperty()
  @IsString()
  @Length(3, 150)
  city: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  interiorNumber: number;

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ValidateNested()
  @Type(() => StateDto)
  @ApiProperty({ type: StateDto })
  state: StatesEntity;

  @ApiProperty()
  @IsString()
  streetName: string;

  @ApiProperty()
  @IsNumber()
  streetNumber: number;

  @ApiProperty()
  @IsNumber()
  zipCode: number;

  @ApiProperty()
  @IsString()
  fullAddress: string;
}
