import { Test, TestingModule } from '@nestjs/testing';
import { WorkingHoursController } from '../working-hours.controller';
import { WorkingHoursService } from '../working-hours.service';
import { ErrorService } from '../../utils/ErrorService';
import { createMock } from '@golevelup/ts-jest';
import { CreateWorkingHourDto } from '../dto/create-working-hour.dto';
import { Usertype } from '../../utils/types/User';
import { UpdateWorkingHourDto } from '../dto/update-working-hour.dto';
import { WorkingDaysEntity } from '../entities/working-days.entity';
import { EnumDays } from '../types/EnumDays';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../utils/RoleEnum';

describe('WorkingHoursController', () => {
  let controller: WorkingHoursController;
  let service: WorkingHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingHoursController],
      providers: [
        {
          provide: WorkingHoursService,
          useValue: createMock<WorkingHoursService>(),
        },
        ErrorService,
      ],
    }).compile();

    service = module.get<WorkingHoursService>(WorkingHoursService);
    controller = module.get<WorkingHoursController>(WorkingHoursController);
  });

  describe('DEFINED', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });
  });

  describe('TESTING CONTROLLER', () => {
    let createDto: CreateWorkingHourDto;
    let updateDto: UpdateWorkingHourDto;
    let workingDayResponse: WorkingDaysEntity;
    let req: { user: Usertype };

    beforeEach(() => {
      req = {
        user: {
          id: faker.datatype.uuid(),
          role: UserRole.DENTIST,
        },
      };

      createDto = {
        day: EnumDays.MONDAY,
        end_work: '20:00',
        start_work: '07:00',
      };

      updateDto = { end_work: '16:00', start_work: '07:00' };

      workingDayResponse = {
        day: createDto.day,
        id: faker.datatype.uuid(),
        profile: null,
        hours: {
          start_work: createDto.start_work,
          end_work: createDto.end_work,
          id: faker.datatype.uuid(),
          days: null,
        },
      };
    });

    describe('CREATE WORKING DAY', () => {
      it('should return WorkingDaysEntity', async () => {
        // CONFIGURATION
        // CALL FUNCTION
        const createSpy = jest
          .spyOn(service, 'createWorkingDay')
          .mockResolvedValue(workingDayResponse);

        const data = await controller.createWorkingDay(createDto, req);

        // TESTING
        expect(data).toEqual(workingDayResponse);
        expect(createSpy).toHaveBeenCalledWith(createDto, req.user);
      });
    });

    describe('DELETE WORKING DAY', () => {
      it('should return success message when delete working day', async () => {
        // CONFIGURATION
        const workingDayId = faker.datatype.uuid();
        const message = `Working day ${workingDayId} deleted`;

        // CALL FUNCTION
        const deleteSpy = jest
          .spyOn(service, 'deleteWorkingDay')
          .mockResolvedValue(message);

        const data = await controller.deleteWorkingDay(workingDayId, req);

        // TESTING
        expect(data).toBe(message);
        expect(deleteSpy).toHaveBeenCalledWith(workingDayId, req.user);
      });
    });

    describe('UPDATE WORKING DAY', () => {
      it('should return success message when working day was updated', async () => {
        // CONFIGURATION
        const id = faker.datatype.uuid();
        const message = `Working day ${id} was updated`;

        // CALL FUNCTION
        const updateSpy = jest
          .spyOn(service, 'updateWorkingDat')
          .mockResolvedValue(message);
        const data = await controller.updateWorkingDat(id, updateDto, req);

        // TESTING
        expect(data).toBe(message);
        expect(updateSpy).toHaveBeenCalledWith(id, updateDto, req.user);
      });
    });

    describe('GET WORKING DAY', () => {
      it('should return Working day entity', async () => {
        // CONFIGURATION
        // CALL FUNCTION
        const getSpy = jest
          .spyOn(service, 'getWorkingDays')
          .mockResolvedValue([workingDayResponse]);

        const data = await controller.getWorkingDays(req);

        // TESTING
        expect(data).toEqual([workingDayResponse]);
        expect(getSpy).toHaveBeenCalledWith(req.user);
      });
    });
  });
});
