import { PartialType } from '@nestjs/swagger';
import { CreateDentistProfileDto } from './create-dentist-profile.dto';

export class UpdateDentistProfileDto extends PartialType(
  CreateDentistProfileDto,
) {}
