import { Test, TestingModule } from '@nestjs/testing';
import { DentistServicesService } from '../dentist-services.service';
import { ErrorService } from '../../utils/ErrorService';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DentistServiceEntity } from '../entities/dentist-service.entity';
import { AmountEntityEntity } from '../entities/amount-entity.entity';
import { Repository } from 'typeorm';
import {
  ListMockServices,
  MockAmountService,
  MockDentistService,
} from './mocks/mockService.mock';
import { faker } from '@faker-js/faker';
import { CurrencyEnum } from '../types/currencyEnum';
import { UpdateDentistServiceDto } from '../dto/services/update-dentist-service.dto';
import { CreateDentistServiceDto } from '../dto/services/create-dentist-service.dto';
import { Usertype } from '../../utils/types/User';
import { UserRole } from '../../utils/RoleEnum';
import { ProfileService } from '../../profile/profile.service';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('DentistServicesService', () => {
  let service: DentistServicesService;
  let repoService: Repository<DentistServiceEntity>;
  let profileService: ProfileService;
  let repoAmount: Repository<AmountEntityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProfileService,
          useValue: {
            findByUserId: jest.fn(),
          },
        },
        DentistServicesService,
        ErrorService,
        {
          provide: getRepositoryToken(DentistServiceEntity),
          useValue: {
            findOneOrFail: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AmountEntityEntity),
          useValue: {
            update: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DentistServicesService>(DentistServicesService);
    profileService = module.get<ProfileService>(ProfileService);
    repoService = module.get<Repository<DentistServiceEntity>>(
      getRepositoryToken(DentistServiceEntity),
    );
    repoAmount = module.get<Repository<AmountEntityEntity>>(
      getRepositoryToken(AmountEntityEntity),
    );
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repoService).toBeDefined();
      expect(repoAmount).toBeDefined();
      expect(profileService).toBeDefined();
    });
  });

  describe('Find One', () => {
    it('should return service entity if was found it', async () => {
      const fakeId = faker.datatype.uuid();

      const findOneOrFailSpy = jest
        .spyOn(repoService, 'findOneOrFail')
        .mockResolvedValue(MockDentistService);

      const data = await service.findOne(fakeId);

      expect(data).toEqual(MockDentistService);
      expect(findOneOrFailSpy).toHaveBeenCalled();
      expect(findOneOrFailSpy).toHaveBeenCalledWith({
        where: { id: fakeId },
        relations: { amount: true },
      });
    });

    it('should return http exception when some services fails', async () => {
      // CONFIGURATION
      const fakeId = faker.datatype.uuid();
      const message = `Service ${fakeId} not found`;

      // CALL FUNCTION
      jest
        .spyOn(repoService, 'findOneOrFail')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(service.findOne(fakeId)).rejects.toThrow(
        new HttpException(
          `user ${message} do not exists`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('Find All', () => {
    it('should return dentist services list', async () => {
      const mockId = faker.datatype.uuid();

      const findAllSpy = jest
        .spyOn(repoService, 'find')
        .mockResolvedValue(ListMockServices);

      const data = await service.findAll(mockId);

      expect(data).toEqual(ListMockServices);
      expect(findAllSpy).toHaveBeenCalledWith({
        where: { profile: { user: { id: mockId } } },
        relations: { amount: true },
      });
    });

    it('should return http exception if some service fails', async () => {
      // CONFIGURATION
      const mockId = faker.datatype.uuid();
      const message = `Services not found to user ${mockId}`;

      // CALL FUNCTION
      jest
        .spyOn(repoService, 'find')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(service.findAll(mockId)).rejects.toThrow(
        new HttpException(
          `user ${message} do not exists`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('Update', () => {
    it('should return string successfully when service was updated', async () => {
      const serviceId = faker.datatype.uuid();
      const userId = faker.datatype.uuid();
      const dataUpdate: UpdateDentistServiceDto = {
        name: faker.name.jobTitle(),
        description: faker.lorem.paragraph(15),
        amount: {
          total: Number(faker.finance.amount()),
          currency: CurrencyEnum.MXN,
        },
      };

      const dataService = {
        name: dataUpdate.name,
        description: dataUpdate.description,
      };

      const responseValues = {
        raw: 1,
        affected: 1,
        generatedMaps: [],
      };

      const amountUpdateSpy = jest
        .spyOn(repoAmount, 'update')
        .mockResolvedValue(responseValues);

      const serviceUpdateSpy = jest
        .spyOn(repoService, 'update')
        .mockResolvedValue(responseValues);

      const data = await service.update(serviceId, userId, dataUpdate);

      expect(data).toBe(`Service ${serviceId} was updated correctly`);
      expect(amountUpdateSpy).toHaveBeenCalledWith(
        {
          service: {
            id: serviceId,
          },
        },
        dataUpdate.amount,
      );
      expect(serviceUpdateSpy).toHaveBeenCalledWith(
        { id: serviceId, profile: { user: { id: userId } } },
        dataService,
      );
    });

    it('should return https exception if some service fails', async () => {
      // CONFIGURATION
      const serviceId = faker.datatype.uuid();
      const userId = faker.datatype.uuid();
      const dataUpdate: UpdateDentistServiceDto = {
        name: faker.name.jobTitle(),
        description: faker.lorem.paragraph(15),
        amount: {
          total: Number(faker.finance.amount()),
          currency: CurrencyEnum.MXN,
        },
      };

      const message = `Service ${serviceId} not found`;

      // CALL FUNCTION
      jest
        .spyOn(repoService, 'update')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(
        service.update(serviceId, userId, dataUpdate),
      ).rejects.toThrowError(
        new HttpException(
          `user ${message} do not exists`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('Delete', () => {
    it('should return successful string when repo delete service', async () => {
      const serviceId = faker.datatype.uuid();
      const userId = faker.datatype.uuid();

      const deleteSpy = jest.spyOn(repoService, 'delete').mockResolvedValue({
        affected: 1,
        raw: {},
      });

      const data = await service.remove(serviceId, userId);
      expect(data).toBe(`Service ${serviceId} was deleted successfully`);
      expect(deleteSpy).toHaveBeenCalledWith({
        id: serviceId,
        profile: { user: { id: userId } },
      });
    });
  });

  describe('Create', () => {
    it('should return success string when servies was created', async () => {
      // CONFIGURATION
      const profileEntityMock: ProfileEntity = {
        create_date_time: faker.date.past(),
        father_last_name: faker.name.lastName(),
        id: faker.datatype.uuid(),
        last_changed_date_time: faker.date.recent(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        phone_number: faker.phone.number(),
        user: null,
      };

      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.DENTIST,
      };

      const createServiceDto: CreateDentistServiceDto = {
        amount: {
          total: Number(faker.finance.amount()),
          currency: CurrencyEnum.MXN,
        },
        description: faker.lorem.paragraph(15),
        name: faker.name.jobTitle(),
        is_visible: true,
      };

      const createServiceSpy = jest.spyOn(repoService, 'create');
      const createAmountSpy = jest.spyOn(repoAmount, 'create');
      const findByUserIdSpy = jest
        .spyOn(profileService, 'findByUserId')
        .mockResolvedValue(profileEntityMock);

      const saveServiceSpy = jest
        .spyOn(repoService, 'save')
        .mockResolvedValue(MockDentistService);

      const saveAmountSpy = jest
        .spyOn(repoAmount, 'save')
        .mockResolvedValue(MockAmountService);

      // CALL FUNCTION
      const data = await service.create(createServiceDto, user);

      // TESTING
      expect(data).toBe(MockDentistService);
      expect(findByUserIdSpy).toHaveBeenCalledWith(user);
      expect(saveServiceSpy).toHaveBeenCalled();
      expect(saveAmountSpy).toHaveBeenCalled();
      expect(createServiceSpy).toHaveBeenCalledWith({
        description: createServiceDto.description,
        name: createServiceDto.name,
      });
      expect(createAmountSpy).toHaveBeenCalledWith({
        currency: createServiceDto.amount.currency,
        total: createServiceDto.amount.total,
      });
    });

    it('should throw error when some service fails', async () => {
      // CONFIGURATION
      const dto: CreateDentistServiceDto = {
        amount: {
          total: Number(faker.finance.amount()),
          currency: CurrencyEnum.MXN,
        },
        description: faker.lorem.lines(15),
        is_visible: true,
        name: faker.lorem.lines(1),
      };

      const user: Usertype = {
        id: faker.datatype.uuid(),
        role: UserRole.DENTIST,
      };

      const message = `user not found ${user.id}`;

      // CALL FUNCTION
      jest
        .spyOn(profileService, 'findByUserId')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(service.create(dto, user)).rejects.toThrowError(
        new HttpException(
          `user ${message} do not exists`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
