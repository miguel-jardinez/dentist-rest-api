import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalLicenseController } from '../professional-license.controller';
import { ProfessionalLicenseService } from '../professional-license.service';

describe('ProfessionalLicenseController', () => {
  let controller: ProfessionalLicenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalLicenseController],
      providers: [ProfessionalLicenseService],
    }).compile();

    controller = module.get<ProfessionalLicenseController>(
      ProfessionalLicenseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
