import { Test, TestingModule } from '@nestjs/testing';
import { WorkingHoursService } from '../working-hours.service';
import { ProfileService } from '../../profile/profile.service';
import { createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkingDaysEntity } from '../entities/working-days.entity';
import { WorkingHourEntity } from '../entities/working-hour.entity';
import { ErrorService } from '../../utils/ErrorService';
import { Usertype } from '../../utils/types/User';
import { UpdateWorkingHourDto } from '../dto/update-working-hour.dto';
import { CreateWorkingHourDto } from '../dto/create-working-hour.dto';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../utils/RoleEnum';
import { EnumDays } from '../types/EnumDays';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

const errorMessage = (message: string) => `user ${message} do not exists`;

describe('WorkingHoursService', () => {
  let service: WorkingHoursService;
  let profileService: ProfileService;
  let repoHours: Repository<WorkingHourEntity>;
  let repoDays: Repository<WorkingDaysEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    repoHours = module.get<Repository<WorkingHourEntity>>(
      getRepositoryToken(WorkingHourEntity),
    );
    repoDays = module.get<Repository<WorkingDaysEntity>>(
      getRepositoryToken(WorkingDaysEntity),
    );
    service = module.get<WorkingHoursService>(WorkingHoursService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  describe('DEFINED', function () {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repoHours).toBeDefined();
      expect(repoDays).toBeDefined();
      expect(profileService).toBeDefined();
    });
  });

  describe('TESTING SERVICES', () => {
    let user: Usertype;
    let createDto: CreateWorkingHourDto;
    let updateDto: UpdateWorkingHourDto;
    let profile: ProfileEntity;

    beforeEach(() => {
      user = {
        id: faker.datatype.uuid(),
        role: UserRole.DENTIST,
      };

      createDto = {
        day: EnumDays.MONDAY,
        end_work: '18:00',
        start_work: '08:00',
      };

      profile = {
        create_date_time: faker.date.past(),
        father_last_name: faker.name.lastName(),
        id: faker.datatype.uuid(),
        last_changed_date_time: faker.date.recent(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        user: null,
      };

      updateDto = {
        end_work: '20:00',
        start_work: '07:00',
      };
    });

    describe('CREATE WORKING DAY', () => {
      it('should return WorkingDaysEntity when was saved', async () => {
        // CONFIGURATION
        const fakeId = faker.datatype.uuid();
        const mockWorkDayEntity: WorkingDaysEntity = {
          day: createDto.day,
          hours: null,
          id: fakeId,
          profile: null,
        };

        const mockWorkingHours: WorkingHourEntity = {
          days: mockWorkDayEntity,
          end_work: createDto.end_work,
          id: fakeId,
          start_work: createDto.start_work,
        };

        // CALL FUNCTIONS
        const profileSpy = jest
          .spyOn(profileService, 'findByUserId')
          .mockResolvedValue(profile);

        const createDaySpy = jest
          .spyOn(repoDays, 'create')
          .mockReturnValue(mockWorkDayEntity);

        const createHoursSpy = jest
          .spyOn(repoHours, 'create')
          .mockReturnValue(mockWorkingHours);

        jest.spyOn(repoDays, 'save').mockResolvedValue(mockWorkDayEntity);

        jest.spyOn(repoHours, 'save').mockResolvedValue(mockWorkingHours);

        const data = await service.createWorkingDay(createDto, user);

        // TESTING
        expect(profileSpy).toHaveBeenCalledWith(user);
        expect(data).toEqual(mockWorkDayEntity);
        expect(createDaySpy).toHaveBeenCalledWith({ day: createDto.day });
        expect(createHoursSpy).toHaveBeenCalledWith({
          start_work: createDto.start_work,
          end_work: createDto.end_work,
        });
      });

      it('should return http exception when some service fails', async () => {
        // CONFIGURATION
        const message = 'Please contact service care or try again';

        // CALL FUNCTIONS
        jest
          .spyOn(profileService, 'findByUserId')
          .mockImplementationOnce(() => Promise.reject({ code: '500' }));

        // TESTING
        await expect(service.createWorkingDay(createDto, user)).rejects.toThrow(
          new HttpException(message, HttpStatus.BAD_GATEWAY),
        );
      });
    });

    describe('DELETE WORKING DAY', () => {
      it('should return success message when day was deleted', async () => {
        // CONFIGURATION
        const id = faker.datatype.uuid();
        const message = `working day ${id} deleted correctly`;

        // CALL FUNCTION
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);

        const deleteSpy = jest.spyOn(repoDays, 'delete').mockResolvedValue({
          affected: 1,
          raw: [],
        });

        const data = await service.deleteWorkingDay(id, user);

        // TESTING
        expect(data).toBe(message);
        expect(deleteSpy).toHaveBeenCalledWith({ id });
      });

      it('should return http exception when delete service fails', async () => {
        // CONFIGURATION
        const id = faker.datatype.uuid();
        const message = `Working day ${id} deleted`;

        // CALL FUNCTION
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);

        jest
          .spyOn(repoDays, 'delete')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '404', message }),
          );

        // TESTING
        await expect(service.deleteWorkingDay(id, user)).rejects.toThrow(
          new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
        );
      });

      it('should return http exception when no delete any', async () => {
        // CONFIGURATION
        const id = faker.datatype.uuid();
        const message = `Please contact service care or try again`;

        // CALL FUNCTION
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);

        jest.spyOn(repoDays, 'delete').mockResolvedValue({
          affected: 0,
          raw: [],
        });

        // TESTING
        await expect(service.deleteWorkingDay(id, user)).rejects.toThrow(
          new HttpException(message, HttpStatus.BAD_GATEWAY),
        );
      });
    });

    describe('UPDATE WORKING DAY', () => {
      it('should return success message when service update working day', async () => {
        // CONFIGURATION
        const workingDayId = faker.datatype.uuid();
        const message = `working day ${workingDayId} updated correctly`;

        // CALL FUNCTIONS
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);
        jest.spyOn(repoHours, 'update').mockResolvedValue({
          affected: 1,
          raw: [],
          generatedMaps: [],
        });

        const data = await service.updateWorkingDat(
          workingDayId,
          updateDto,
          user,
        );

        // TESTING
        expect(data).toBe(message);
      });

      it('should return http exception when service update no update any', async () => {
        // CONFIGURATION
        const workingDayId = faker.datatype.uuid();

        // CALL FUNCTIONS
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);
        jest.spyOn(repoHours, 'update').mockResolvedValue({
          affected: 0,
          raw: [],
          generatedMaps: [],
        });

        // TESTING
        await expect(
          service.updateWorkingDat(workingDayId, updateDto, user),
        ).rejects.toThrow(
          new HttpException(
            'Please contact service care or try again',
            HttpStatus.BAD_GATEWAY,
          ),
        );
      });
    });

    describe('GET WORKING DAYS', () => {
      it('should return Working day array', async () => {
        // CONFIGURATION
        const daysId = faker.datatype.uuid();
        const hoursId = faker.datatype.uuid();
        const days: WorkingDaysEntity[] = [
          {
            profile: null,
            day: EnumDays.SATURDAY,
            id: daysId,
            hours: {
              days: null,
              id: hoursId,
              end_work: '20:00',
              start_work: '07:00',
            },
          },
        ];

        // CALL FUNCTIONS
        const findSpy = jest.spyOn(repoDays, 'find').mockResolvedValue(days);
        const data = await service.getWorkingDays(user);

        // TESTING
        expect(data).toEqual(days);
        expect(findSpy).toHaveBeenCalledWith({
          where: { profile: { user: { id: user.id } } },
          relations: {
            hours: true,
          },
        });
      });

      it('should return http exception when find service fails', async () => {
        // CONFIGURATION
        const message = `user ${user.id} do not have days created`;

        // CALL FUNCTIONS
        jest
          .spyOn(repoDays, 'find')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '404', message }),
          );

        // TESTING
        await expect(service.getWorkingDays(user)).rejects.toThrow(
          new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
        );
      });
    });
  });
});
