import { PartialType } from '@nestjs/swagger';
import { CreateCustomerEmergencyContactDto } from './create-customerEmergencyContact.dto';

export class UpdateCustomerEmergencyContactDto extends PartialType(
  CreateCustomerEmergencyContactDto,
) {}
