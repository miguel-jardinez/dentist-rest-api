import { Test, TestingModule } from '@nestjs/testing';
import { PatientFormService } from './patient-form.service';

describe('PatientFormService', () => {
  let service: PatientFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientFormService],
    }).compile();

    service = module.get<PatientFormService>(PatientFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
