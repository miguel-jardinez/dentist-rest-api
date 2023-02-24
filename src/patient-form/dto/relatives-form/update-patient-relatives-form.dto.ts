import { PartialType } from '@nestjs/swagger';
import { CreatePatientRelativesFormDto } from './create-patient-relatives-form.dto';

export class UpdatePatientRelativesFormDto extends PartialType(
  CreatePatientRelativesFormDto,
) {}
