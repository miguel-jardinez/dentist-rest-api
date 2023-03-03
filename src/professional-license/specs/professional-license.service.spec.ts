import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalLicenseService } from '../professional-license.service';
import { ErrorService } from '../../utils/ErrorService';
import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { ProfileService } from '../../profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessionalLicenseEntity } from '../entities/professional-license.entity';
import { HttpService } from '@nestjs/axios';

describe('ProfessionalLicenseService', () => {
  let service: ProfessionalLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ProfessionalLicenseService>(
      ProfessionalLicenseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
