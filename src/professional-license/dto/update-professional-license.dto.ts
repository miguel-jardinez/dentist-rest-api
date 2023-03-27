import { PartialType } from '@nestjs/swagger';
import { CreateProfessionalLicenseDto } from './create-professional-license.dto';

export class UpdateProfessionalLicenseDto extends PartialType(
  CreateProfessionalLicenseDto,
) {}
