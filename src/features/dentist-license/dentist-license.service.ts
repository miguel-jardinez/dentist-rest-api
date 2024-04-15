import { Injectable } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicenseServiceInterface } from '@features/dentist-license/repository/licenseService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DentistLicenseEntity } from '@features/dentist-license/entities/dentist-license.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorService } from '@utils/ErrorService';
import { ResponseApi } from '@utils/ResponseApi';
import { GetLicenseDtoInterface } from '@features/dentist-license/repository/getLicenseDto.interface';
import { HttpService } from '@nestjs/axios';
import { LicenseSepResponse } from '@features/dentist-license/types/LicenseSepResponse';
import { EnvConfigService } from '@core/env-config/env-config.service';

@Injectable()
export class DentistLicenseService implements LicenseServiceInterface {
  constructor(
    @InjectRepository(DentistLicenseEntity)
    private readonly licenseRepository: Repository<DentistLicenseEntity>,
    private readonly errorService: ErrorService,
    private readonly httpService: HttpService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  async createLicense(
    dentistProfileId: string,
    createLicense: CreateLicenseDto,
  ): Promise<ResponseApi<DentistLicenseEntity>> {
    try {
      const license = this.licenseRepository.create({
        ...createLicense,
        dentistProfile: { id: dentistProfileId },
      });
      const licenseEntity = await this.licenseRepository.save(license);

      return new ResponseApi(licenseEntity, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async deleteLicense(
    dentistProfileIs: string,
    licenseId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    try {
      const deleteResult = await this.licenseRepository.delete({
        id: licenseId,
        dentistProfile: { id: dentistProfileIs },
      });

      return new ResponseApi(deleteResult, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getLicenseData(
    getLicenseDto: GetLicenseDtoInterface,
  ): Promise<ResponseApi<LicenseSepResponse>> {
    try {
      const request = {
        maxResult: 1,
        nombre: getLicenseDto.name,
        paterno: getLicenseDto.fatherLastName,
        materno: getLicenseDto.motherLastName,
        idCedula: getLicenseDto.licenseNumber,
      };

      const requestString = JSON.stringify(request);

      const url = this.envConfigService.getString('SEP_LICENSE_URL');
      const data = await this.httpService.axiosRef.get<LicenseSepResponse>(
        url,
        {
          params: { json: requestString },
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        },
      );

      return new ResponseApi(data.data, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async updateLicense(
    dentistProfileId: string,
    licenseId: string,
    updateLicenseDto: UpdateLicenseDto,
  ): Promise<ResponseApi<UpdateResult>> {
    try {
      const deleteResult = await this.licenseRepository.update(
        { id: licenseId, dentistProfile: { id: dentistProfileId } },
        updateLicenseDto,
      );

      return new ResponseApi(deleteResult, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getAllLicenses(
    dentistProfileId: string,
  ): Promise<ResponseApi<Array<DentistLicenseEntity>>> {
    try {
      const data = await this.licenseRepository.find({
        where: { dentistProfile: { id: dentistProfileId } },
      });
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getOneLicense(
    dentistProfileId: string,
    licenseId: string,
  ): Promise<ResponseApi<DentistLicenseEntity>> {
    try {
      const data = await this.licenseRepository.findOne({
        where: { id: licenseId, dentistProfile: { id: dentistProfileId } },
      });
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
