import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalLicenseController } from '../professional-license.controller';
import { ProfessionalLicenseService } from '../professional-license.service';
import { ErrorService } from '../../utils/ErrorService';
import { ProfileService } from '../../profile/profile.service';
import { createMock } from '@golevelup/ts-jest';
import { HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessionalLicenseEntity } from '../entities/professional-license.entity';
import { ConfigService } from '@nestjs/config';

describe('ProfessionalLicenseController', () => {
  let controller: ProfessionalLicenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalLicenseController],
      providers: [
        ProfessionalLicenseService,
        ErrorService,
        {
          provide: ProfileService,
          useValue: createMock<ProfileService>(),
        },
        { provide: HttpService, useValue: createMock<HttpService>() },
        {
          provide: getRepositoryToken(ProfessionalLicenseEntity),
          useValue: createMock<ProfessionalLicenseEntity>(),
        },
        { provide: ConfigService, useValue: createMock<ConfigService>() },
      ],
    }).compile();

    controller = module.get<ProfessionalLicenseController>(
      ProfessionalLicenseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
