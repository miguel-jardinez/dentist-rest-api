import { GetLicenseDtoInterface } from '@features/dentist-license/repository/getLicenseDto.interface';
import { CreateLicenseDto } from '@features/dentist-license/dto/create-license.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { DentistLicenseEntity } from '@features/dentist-license/entities/dentist-license.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateLicenseDto } from '@features/dentist-license/dto/update-license.dto';
import { LicenseSepResponse } from '@features/dentist-license/types/LicenseSepResponse';

export interface LicenseServiceInterface {
  getLicenseData: (
    getLicenseDto: GetLicenseDtoInterface,
  ) => Promise<ResponseApi<LicenseSepResponse>>;
  createLicense: (
    dentistProfileId: string,
    createLicense: CreateLicenseDto,
  ) => Promise<ResponseApi<DentistLicenseEntity>>;
  deleteLicense: (
    dentistProfileId: string,
    licenseId: string,
  ) => Promise<ResponseApi<DeleteResult>>;
  updateLicense: (
    dentistProfileId: string,
    licenseId: string,
    updateLicenseDto: UpdateLicenseDto,
  ) => Promise<ResponseApi<UpdateResult>>;

  getAllLicenses: (
    dentistProfileId: string,
  ) => Promise<ResponseApi<Array<DentistLicenseEntity>>>;
  getOneLicense: (
    dentistProfileId: string,
    licenseId: string,
  ) => Promise<ResponseApi<DentistLicenseEntity>>;
}
