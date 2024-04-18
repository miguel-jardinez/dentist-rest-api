import { PartialType } from '@nestjs/swagger';
import { CreateDentistEstablishmentDto } from './create-dentist-establishment.dto';

export class UpdateDentistEstablishmentDto extends PartialType(CreateDentistEstablishmentDto) {}
