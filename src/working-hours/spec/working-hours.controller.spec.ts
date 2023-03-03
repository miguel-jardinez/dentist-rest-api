import { Test, TestingModule } from '@nestjs/testing';
import { WorkingHoursController } from '../working-hours.controller';
import { WorkingHoursService } from '../working-hours.service';
import { ErrorService } from '../../utils/ErrorService';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkingHourEntity } from '../entities/working-hour.entity';
import { createMock } from '@golevelup/ts-jest';
import { WorkingDaysEntity } from '../entities/working-days.entity';
import { ProfileService } from '../../profile/profile.service';

describe('WorkingHoursController', () => {
  let controller: WorkingHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingHoursController],
      providers: [
        WorkingHoursService,
        ErrorService,
        {
          provide: getRepositoryToken(WorkingHourEntity),
          useValue: createMock<WorkingHourEntity>(),
        },
        {
          provide: getRepositoryToken(WorkingDaysEntity),
          useValue: createMock<WorkingDaysEntity>(),
        },
        { provide: ProfileService, useValue: createMock<ProfileService>() },
      ],
    }).compile();

    controller = module.get<WorkingHoursController>(WorkingHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
