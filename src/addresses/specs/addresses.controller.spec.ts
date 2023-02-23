import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from '../addresses.controller';
import { AddressesService } from '../addresses.service';
import { faker } from '@faker-js/faker';
import { MockAddressMapBox } from './mocks/mapBox.mock';
import { createDto, requestMock, updateDto } from './mocks/dtos.mock';
import { MockAddress, MockCreateAddress } from './mocks/address.mock';

describe('AddressesController', () => {
  let controller: AddressesController;
  let service: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [
        {
          provide: AddressesService,
          useValue: {
            getAddresses: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
    service = module.get<AddressesService>(AddressesService);
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });
  });

  describe('GET /get-address/:address', () => {
    it('should AddressType response when api fetch data', async () => {
      // CONFIGURATION
      const fakeAddress = faker.address.streetAddress();
      const spyGetData = jest
        .spyOn(service, 'getAddresses')
        .mockResolvedValue(MockAddressMapBox);

      // CALL FUNCTIONS
      const data = await controller.getAddress(fakeAddress);

      // TESTING BEHAVIOR
      expect(spyGetData).toHaveBeenCalledWith(fakeAddress);
      expect(data).toEqual(MockAddressMapBox);
    });
  });

  describe('POST /create', () => {
    it('should return address entity when service save it correctly', async () => {
      // CONFIGURATION
      const addressId = faker.datatype.uuid();
      const profileId = faker.datatype.uuid();
      const AddressResponseMock = MockCreateAddress(
        addressId,
        createDto,
        profileId,
      );

      const spyCreate = jest
        .spyOn(service, 'create')
        .mockResolvedValue(AddressResponseMock);

      // CALL FUNCTION
      const data = await controller.create(createDto, requestMock);

      // TESTING
      expect(data).toEqual(AddressResponseMock);
      expect(spyCreate).toHaveBeenCalledWith(createDto, requestMock.user.id);
    });
  });

  describe('GET /profile/address', () => {
    it('should return all address from user id', async () => {
      // CONFIGURATION
      const mockAddressOne = MockAddress(faker.datatype.uuid());
      const mockAddressTwo = MockAddress(faker.datatype.uuid());
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue([mockAddressOne, mockAddressTwo]);

      // CALL FUNCTION
      const data = await controller.findAll(requestMock);

      // TESTING
      expect(data).toHaveLength(2);
      expect(findAllSpy).toHaveBeenCalledWith(requestMock.user.id);
    });
  });

  describe('GET :id', () => {
    it('should return one address when id is passing', async () => {
      // CONFIGURATION
      const addressId = faker.datatype.uuid();
      const mockAddress = MockAddress(addressId);
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockAddress);

      // CALL FUNCTION
      const data = await controller.findOne(addressId, requestMock);

      // TESTING
      expect(data).toEqual(mockAddress);
      expect(findOneSpy).toHaveBeenCalledWith(addressId, requestMock.user.id);
    });
  });

  describe('PUT /update/id', () => {
    it('should return success message when address was updated successfully', async () => {
      // CONFIGURATION
      const addressId = faker.datatype.uuid();
      const successfulMessage = `Address ${addressId} was updated successfully`;
      const deleteSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValue(successfulMessage);

      // CALL FUNCTION
      const data = await controller.update(addressId, updateDto, requestMock);

      // TESTING
      expect(data).toEqual(successfulMessage);
      expect(deleteSpy).toHaveBeenCalledWith(
        addressId,
        updateDto,
        requestMock.user.id,
      );
    });
  });

  describe('DELETE /delete/:id', () => {
    it('should return success message when address was deleted successfully', async () => {
      // CONFIGURATION
      const addressId = faker.datatype.uuid();
      const successMessage = `Address ${addressId} was deleted successful`;
      const deleteSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValue(successMessage);

      // CALL FUNCTION
      const data = await controller.remove(addressId, requestMock);

      // TESTING
      expect(data).toBe(successMessage);
      expect(deleteSpy).toHaveBeenCalledWith(addressId, requestMock.user.id);
    });
  });
});
