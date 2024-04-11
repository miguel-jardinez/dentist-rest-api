import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { CreateCustomerEmergencyContactDtoInterface } from '@features/customer_emergency_contact/reposiotory/createCustomerEmergencyContactDto.interface';

export class CreateCustomerEmergencyContactDto
  implements CreateCustomerEmergencyContactDtoInterface
{
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 150)
  name: string;

  @IsString()
  @Length(3, 150)
  lastName: string;

  @IsString()
  @MaxLength(10)
  phoneNumber: string;

  @IsString()
  relationship: string;
}
