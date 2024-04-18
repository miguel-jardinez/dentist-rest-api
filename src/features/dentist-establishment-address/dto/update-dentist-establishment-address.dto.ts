import { PartialType } from '@nestjs/swagger';
import { CreateDentistAddressDto } from './create-dentist-establishment-address.dto';

export class UpdateDentistAddressDto extends PartialType(CreateDentistAddressDto) {}
