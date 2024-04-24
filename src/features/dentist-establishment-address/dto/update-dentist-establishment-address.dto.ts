import { PartialType } from '@nestjs/swagger';
import { CreateDentistEstablishmentAddressDto } from './create-dentist-establishment-address.dto';

export class UpdateDentistEstablishmentAddressDto extends PartialType(
  CreateDentistEstablishmentAddressDto,
) {}
