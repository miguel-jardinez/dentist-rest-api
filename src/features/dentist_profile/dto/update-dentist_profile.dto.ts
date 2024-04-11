import { PartialType } from '@nestjs/swagger';
import { CreateDentistProfileDto } from './create-dentist_profile.dto';

export class UpdateDentistProfileDto extends PartialType(CreateDentistProfileDto) {}
