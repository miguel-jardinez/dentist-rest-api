import { CreateCustomerProfileDtoInterface } from '@features/customer_profile/repository/customerProfileDto.interface';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto implements CreateCustomerProfileDtoInterface {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @IsOptional()
  phoneNumber: string;
}
