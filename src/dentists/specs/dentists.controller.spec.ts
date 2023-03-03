import { Test, TestingModule } from '@nestjs/testing';
import { DentistsController } from '../dentists.controller';
import { DentistsService } from '../dentists.service';
import { createMock } from '@golevelup/ts-jest';

describe('DentistsController', () => {
  let controller: DentistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DentistsController],
      providers: [
        { provide: DentistsService, useValue: createMock<DentistsService>() },
      ],
    }).compile();

    controller = module.get<DentistsController>(DentistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
