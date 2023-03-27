import { PartialType } from '@nestjs/swagger';
import { CreatePatientPersonalFormDto } from './create-patient-personal-form.dto';

export class UpdatePatientPersonalFormDto extends PartialType(
  CreatePatientPersonalFormDto,
) {}
