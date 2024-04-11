import { PartialType } from '@nestjs/swagger';
import { CreateDentistAddressDto } from './create-dentist_address.dto';

export class UpdateDentistAddressDto extends PartialType(CreateDentistAddressDto) {}
