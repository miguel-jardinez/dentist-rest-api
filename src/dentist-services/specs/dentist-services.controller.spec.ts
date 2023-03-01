import { Test, TestingModule } from '@nestjs/testing';
import { DentistServicesController } from '../dentist-services.controller';
import { DentistServicesService } from '../dentist-services.service';
import { faker } from '@faker-js/faker';
import { requestMock, updateServiceDto } from './mocks/dtos.mock';
import { DentistServiceEntity } from '../entities/dentist-service.entity';
import { CreateDentistServiceDto } from '../dto/services/create-dentist-service.dto';
import { UserRole } from '../../utils/RoleEnum';
import { CurrencyEnum } from '../types/currencyEnum';

describe('DentistServicesController', () => {
  let controller: DentistServicesController;
  let service: DentistServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DentistServicesController],
      providers: [
        {
          provide: DentistServicesService,
          useValue: {
            remove: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DentistServicesController>(
      DentistServicesController,
    );
    service = module.get<DentistServicesService>(DentistServicesService);
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });
  });

  describe('POST /create', () => {
    it('should return DentistServiceEntity when is created', async () => {
      // CONFIGURATION
      const req = {
        user: {
          id: faker.datatype.uuid(),
          role: UserRole.DENTIST,
        },
      };

      const dto: CreateDentistServiceDto = {
        amount: {
          total: Number(faker.finance.amount()),
          currency: CurrencyEnum.MXN,
        },
        description: faker.lorem.lines(15),
        is_visible: true,
        name: faker.lorem.lines(1),
      };

      const mockEntityCreated: DentistServiceEntity = {
        amount: {
          id: faker.datatype.uuid(),
          service: null,
          total: dto.amount.total,
          currency: dto.amount.currency,
        },
        description: dto.description,
        id: faker.datatype.uuid(),
        is_visible: dto.is_visible,
        name: dto.name,
        profile: null,
      };

      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValue(mockEntityCreated);

      // CALL FUNCTION
      const data = await controller.create(dto, req);

      // TESTING
      expect(createSpy).toHaveBeenCalledWith(dto, req.user);
      expect(data).toEqual(mockEntityCreated);
    });
  });

  describe('GET /all', () => {
    it('should return list of DentistServiceEntity', async () => {
      // CONFIGURATION
      const req = {
        user: {
          id: faker.datatype.uuid(),
        },
      };
      const ResponseService: DentistServiceEntity[] = [
        {
          id: faker.datatype.uuid(),
          profile: null,
          description: faker.lorem.lines(5),
          is_visible: true,
          name: faker.lorem.lines(1),
          amount: {
            id: faker.datatype.uuid(),
            service: null,
            total: Number(faker.finance.amount()),
            currency: 'MXN',
          },
        },
        {
          id: faker.datatype.uuid(),
          profile: null,
          description: faker.lorem.lines(5),
          is_visible: true,
          name: faker.lorem.lines(1),
          amount: {
            id: faker.datatype.uuid(),
            service: null,
            total: Number(faker.finance.amount()),
            currency: 'MXN',
          },
        },
      ];

      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(ResponseService);

      // CALL FUNCTION
      const data = await controller.findAll(req);

      // TESTING
      expect(findAllSpy).toHaveBeenCalledWith(req.user.id);
      expect(data).toHaveLength(ResponseService.length);
    });
  });

  describe('GET /:id', () => {
    it('should return one dentist service when controller receive id', async () => {
      const mockService = <DentistServiceEntity>{
        id: faker.datatype.uuid(),
        profile: null,
        description: faker.lorem.lines(5),
        is_visible: true,
        name: faker.lorem.lines(1),
        amount: {
          id: faker.datatype.uuid(),
          service: null,
          total: Number(faker.finance.amount()),
          currency: 'MXN',
        },
      };

      // CONFIGURATION
      const serviceId = faker.datatype.uuid();
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockService);

      // CALL FUNCTION
      const data = await controller.findOne(serviceId);

      // TESTING
      expect(findOneSpy).toHaveBeenCalledWith(serviceId);
      expect(data).toEqual(mockService);
    });
  });

  describe('PUT /:id', () => {
    it('should ', async () => {
      // CONFIGURATION
      const serviceId = faker.datatype.uuid();
      const successMessage = `Service ${serviceId} was updated correctly`;
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValue(successMessage);

      // CALL FUNCTION
      const data = await controller.update(
        serviceId,
        updateServiceDto,
        requestMock,
      );

      // TESTING
      expect(data).toBe(successMessage);
      expect(updateSpy).toHaveBeenCalledWith(
        serviceId,
        requestMock.user.id,
        updateServiceDto,
      );
    });
  });

  describe('DELETE /:id', () => {
    it('should ', async () => {
      // CONFIGURATION
      const serviceId = faker.datatype.uuid();
      const successMessage = `Service ${serviceId} was deleted successfully`;
      const removeController = jest
        .spyOn(service, 'remove')
        .mockResolvedValue(successMessage);

      // CALL FUNCTION
      const data = await controller.remove(serviceId, requestMock);

      // TESTING
      expect(data).toBe(successMessage);
      expect(removeController).toHaveBeenCalledWith(
        serviceId,
        requestMock.user.id,
      );
    });
  });
});
