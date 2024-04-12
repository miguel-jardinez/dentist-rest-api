import { CreateCustomerProfileDtoInterface } from '@features/customer_profile/repository/customerProfileDto.interface';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto implements CreateCustomerProfileDtoInterface {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  phoneNumber: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
