import { Injectable, Logger } from '@nestjs/common';
import { CreateProfessionalLicenseDto } from './dto/create-professional-license.dto';
import { UpdateProfessionalLicenseDto } from './dto/update-professional-license.dto';
import { InterfaceService, Usertype } from './interfaces/interface.service';
import { ProfessionalLicenseEntity } from './entities/professional-license.entity';
import { ItemsLicense, LicenseResponse } from './types/licenseResponse';
import { GetLicenseDto } from './dto/get-license.dto';
import { ErrorService } from '../utils/ErrorService';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { UserRole } from '../utils/RoleEnum';

@Injectable()
export class ProfessionalLicenseService implements InterfaceService {
  private readonly logger = new Logger(ProfessionalLicenseService.name);

  constructor(
    private readonly errorService: ErrorService,
    private readonly httpService: HttpService,
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
    @InjectRepository(ProfessionalLicenseEntity)
    private readonly licenseRepository: Repository<ProfessionalLicenseEntity>,
  ) {}
  public async createProfessionalLicense(
    createLicense: CreateProfessionalLicenseDto,
    user: Usertype,
  ): Promise<ProfessionalLicenseEntity> {
    try {
      const profile = await this.profileService.findByUserId(user);

      if (!profile) {
        this.logger.error(
          `User ${user.id} do not have profile please complete first and try again`,
        );
        this.errorService.errorHandling('404');
      }

      const argsLicense = <GetLicenseDto>{
        idCedula: createLicense.id_license,
        materno: '',
        maxResult: '1000',
        nombre: '',
        paterno: '',
      };

      const dataItemLicense = await this.getProfessionalLicense(argsLicense);
      const isValidLicense = await this.compareLicense(
        user,
        createLicense.id_license,
        dataItemLicense,
      );

      if (!isValidLicense) {
        this.logger.error(
          `We do not confirm the license ${createLicense.id_license} try again`,
        );
        this.errorService.errorHandling(
          '404',
          'License number or name it is incorrect please try again',
        );
      }

      const licenseCreate = this.licenseRepository.create({
        id_license: dataItemLicense.idCedula,
        school_degree: dataItemLicense.desins,
        degree: dataItemLicense.titulo,
      });

      const data = await this.licenseRepository.save({
        ...licenseCreate,
        profile: { id: profile.id },
      });

      this.logger.log(
        `License ${licenseCreate.id} created successfully to user_id: ${user.id}`,
      );

      return data;
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  public async updateProfessionalLicense(
    updateLicense: UpdateProfessionalLicenseDto,
    licenseId: string,
    user: Usertype,
  ): Promise<string> {
    try {
      const argsLicense = <GetLicenseDto>{
        idCedula: licenseId,
        materno: '',
        maxResult: '1000',
        nombre: '',
        paterno: '',
      };
      const licenceItem = await this.getProfessionalLicense(argsLicense);
      const isValidLicense = await this.compareLicense(
        user,
        licenseId,
        licenceItem,
      );

      if (!isValidLicense) {
        this.logger.error(
          `We do not confirm the license ${licenseId} please try again`,
        );
        this.errorService.errorHandling(
          '404',
          'License number or name it is incorrect please try again',
        );
      }

      const data = await this.licenseRepository.update(
        {
          profile: { user: { id: user.id, role: UserRole.DENTIST } },
        },
        {
          id_license: licenceItem.idCedula,
          degree: licenceItem.titulo,
          school_degree: licenceItem.desins,
        },
      );

      if (data.affected === 0) {
        this.logger.error(
          `We do not confirm the license ${licenseId} please try again`,
        );
        this.errorService.errorHandling('404', `License number ${licenseId}`);
      }

      return `License number ${licenseId} was updates with degree ${licenceItem.titulo}`;
    } catch (e) {
      this.logger.error(
        `License id ${licenseId} could not to be updated in user_id: ${user.id}`,
      );
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  public async getProfessionalLicense(
    getLicenseDto: GetLicenseDto,
  ): Promise<ItemsLicense> {
    try {
      const url = this.configService.get<string>('PROFESSIONAL_LICENSE_URL');
      const argsToString = JSON.stringify(getLicenseDto);

      const { data } = await this.httpService.axiosRef.post<LicenseResponse>(
        url,
        `json=${argsToString}`,
        {
          responseEncoding: 'latin1',
        },
      );

      const license = data.items.find(
        (license) => license.idCedula === getLicenseDto.idCedula,
      );

      if (!license) {
        this.logger.error(
          `Failed to fetch professional license number ${getLicenseDto.idCedula}`,
        );

        this.errorService.errorHandling(
          '404',
          `Professional license with id ${getLicenseDto.idCedula} not found`,
        );
      }

      this.logger.log(
        `Professional license ${getLicenseDto.idCedula} found correctly`,
      );

      return license;
    } catch (e) {
      this.logger.error(
        `Failed to fetch professional license number ${getLicenseDto.idCedula}`,
      );
      this.errorService.errorHandling('404', e.message);
    }
  }

  private async compareLicense(
    userId: Usertype,
    idLicense: string,
    licenseData: ItemsLicense,
  ): Promise<boolean> {
    const profile = await this.profileService.findByUserId(userId);
    const fullNameUser =
      `${profile.name} ${profile.father_last_name} ${profile.mother_last_name}`.toLowerCase();
    const fullLicenseName =
      `${licenseData.nombre} ${licenseData.paterno} ${licenseData.materno}`.toLowerCase();

    const userIdLicense = idLicense;
    const licenseId = licenseData.idCedula;

    return fullNameUser === fullLicenseName && userIdLicense === licenseId;
  }
}
