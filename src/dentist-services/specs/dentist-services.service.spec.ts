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

describe('DentistServicesService', () => {
  let service: DentistServicesService;
  let repoService: Repository<DentistServiceEntity>;
  let repoAmount: Repository<AmountEntityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
        where: { user: { id: mockId } },
        relations: { amount: true },
      });
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
        { id: serviceId, user: { id: userId } },
        dataService,
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
        user: { id: userId },
      });
    });
  });

  describe('Create', () => {
    it('should return success string when servies was created', async () => {
      const userId = faker.datatype.uuid();

      const createServiceDto: CreateDentistServiceDto = {
        amount: {
          total: Number(faker.finance.amount()),
          currency: CurrencyEnum.MXN,
        },
        description: faker.lorem.paragraph(15),
        name: faker.name.jobTitle(),
      };

      const createServiceSpy = jest.spyOn(repoService, 'create');
      const createAmountSpy = jest.spyOn(repoAmount, 'create');

      const saveServiceSpy = jest
        .spyOn(repoService, 'save')
        .mockResolvedValue(MockDentistService);

      const saveAmountSpy = jest
        .spyOn(repoAmount, 'save')
        .mockResolvedValue(MockAmountService);

      const data = await service.create(createServiceDto, userId);

      expect(data).toBe(
        `Service ${MockDentistService.name} was created successfully`,
      );
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
  });
});
