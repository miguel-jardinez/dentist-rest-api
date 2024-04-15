import { ResponseApi } from '@utils/ResponseApi';
import { DentistLicenseEntity } from '@features/dentist-license/entities/dentist-license.entity';
import { CreateLicenseDto } from '@features/dentist-license/dto/create-license.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { LicenseSepResponse } from '@features/dentist-license/types/LicenseSepResponse';
import { UpdateLicenseDto } from '@features/dentist-license/dto/update-license.dto';
import { RequestUserData } from '@utils/RequestUserData';
import { GetLicenseDto } from '@features/dentist-license/dto/get-license.dto';

export interface LicenseControllerInterface {
  getLicenseData: (
    getLicenseDto: GetLicenseDto,
  ) => Promise<ResponseApi<LicenseSepResponse>>;
  createLicense: (
    request: RequestUserData,
    createLicense: CreateLicenseDto,
  ) => Promise<ResponseApi<DentistLicenseEntity>>;
  deleteLicense: (
    request: RequestUserData,
    licenseId: string,
  ) => Promise<ResponseApi<DeleteResult>>;
  updateLicense: (
    request: RequestUserData,
    licenseId: string,
    updateLicenseDto: UpdateLicenseDto,
  ) => Promise<ResponseApi<UpdateResult>>;
  getAllLicenses: (
    request: RequestUserData,
  ) => Promise<ResponseApi<Array<DentistLicenseEntity>>>;
  getOneLicense: (
    request: RequestUserData,
    licenseId: string,
  ) => Promise<ResponseApi<DentistLicenseEntity>>;
}
