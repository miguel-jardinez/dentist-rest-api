import { IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { CreateCustomerEmergencyContactDtoInterface } from '@features/customer_emergency_contact/reposiotory/createCustomerEmergencyContactDto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerEmergencyContactDto
  implements CreateCustomerEmergencyContactDtoInterface
{
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 150)
  @ApiProperty()
  name: string;

  @IsString()
  @Length(3, 150)
  @ApiProperty()
  lastName: string;

  @IsString()
  @MaxLength(10)
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  relationship: string;
}
