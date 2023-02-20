import { Test, TestingModule } from '@nestjs/testing';
import { DentistServicesController } from '../dentist-services.controller';
import { DentistServicesService } from '../dentist-services.service';
import { faker } from '@faker-js/faker';
import { requestMock, updateServiceDto } from './mocks/dtos.mock';

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
    it('should ', async () => {
      // CONFIGURATION
      // CALL FUNCTION
      // TESTING
    });
  });

  describe('GET /all', () => {
    it('should ', async () => {
      // CONFIGURATION
      // CALL FUNCTION
      // TESTING
    });
  });

  describe('GET /:id', () => {
    it('should ', async () => {
      // CONFIGURATION
      // CALL FUNCTION
      // TESTING
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
