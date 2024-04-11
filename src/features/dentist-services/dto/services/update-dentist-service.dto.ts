import { PartialType } from '@nestjs/swagger';
import { CreateDentistServiceDto } from './create-dentist-service.dto';

export class UpdateDentistServiceDto extends PartialType(
  CreateDentistServiceDto,
) {}
