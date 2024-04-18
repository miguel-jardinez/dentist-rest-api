import { CreateDentistEstablishmentDtoInterface } from '@features/dentist-establishment/repository/createDentistEstablishmentDto.interface';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDentistEstablishmentDto
  implements CreateDentistEstablishmentDtoInterface
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;
}
