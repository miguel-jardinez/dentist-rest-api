import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalLicenseService } from '../professional-license.service';

describe('ProfessionalLicenseService', () => {
  let service: ProfessionalLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalLicenseService],
    }).compile();

    service = module.get<ProfessionalLicenseService>(
      ProfessionalLicenseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
