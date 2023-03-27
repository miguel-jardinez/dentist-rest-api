import { ProfessionalLicenseEntity } from '../entities/professional-license.entity';
import { CreateProfessionalLicenseDto } from '../dto/create-professional-license.dto';
import { UpdateProfessionalLicenseDto } from '../dto/update-professional-license.dto';
import { ItemsLicense } from '../types/licenseResponse';
import { GetLicenseDto } from '../dto/get-license.dto';
import { UserRole } from '../../utils/RoleEnum';
export type Usertype = { id: string; role: UserRole };

export interface InterfaceService {
  getProfessionalLicense: (
    getLicenseDto: GetLicenseDto,
  ) => Promise<ItemsLicense>;
  createProfessionalLicense: (
    createLicense: CreateProfessionalLicenseDto,
    user: Usertype,
  ) => Promise<ProfessionalLicenseEntity>;
  updateProfessionalLicense: (
    updateLicense: UpdateProfessionalLicenseDto,
    licenseId: string,
    user: Usertype,
  ) => Promise<string>;
}
