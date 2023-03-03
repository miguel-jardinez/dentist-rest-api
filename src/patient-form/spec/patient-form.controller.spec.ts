import { Test, TestingModule } from '@nestjs/testing';
import { PatientFormController } from '../patient-form.controller';
import { PatientFormService } from '../patient-form.service';
import { createMock } from '@golevelup/ts-jest';

describe('PatientFormController', () => {
  let controller: PatientFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientFormController],
      providers: [
        {
          provide: PatientFormService,
          useValue: createMock<PatientFormService>(),
        },
      ],
    }).compile();

    controller = module.get<PatientFormController>(PatientFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
