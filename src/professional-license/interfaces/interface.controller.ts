import { ProfessionalLicenseEntity } from '../entities/professional-license.entity';
import { CreateProfessionalLicenseDto } from '../dto/create-professional-license.dto';
import { UpdateProfessionalLicenseDto } from '../dto/update-professional-license.dto';
import { GetLicenseDto } from '../dto/get-license.dto';
import { ItemsLicense } from '../types/licenseResponse';

export interface InterfaceController {
  getProfessionalLicense: (
    getLicenseDto: GetLicenseDto,
  ) => Promise<ItemsLicense>;
  createProfessionalLicense: (
    createLicense: CreateProfessionalLicenseDto,
    request: Request,
  ) => Promise<ProfessionalLicenseEntity>;
  updateProfessionalLicense: (
    updateLicense: UpdateProfessionalLicenseDto,
    licenseId: string,
    request: Request,
  ) => Promise<string>;
}
