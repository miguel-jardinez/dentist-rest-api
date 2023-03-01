import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from '../addresses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressEntity } from '../entities/address.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErrorService } from '../../utils/ErrorService';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ProfileService } from '../../profile/profile.service';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import {
  MockAddress,
  MockCreateAddress,
  MockFullAddress,
  MockProfile,
} from './mocks/address.mock';
import { createDto, updateDto } from './mocks/dtos.mock';
import { Usertype } from '../../utils/types/User';
import { UserRole } from '../../utils/RoleEnum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { UpdateAddressDto } from '../dto/update-address.dto';

type KeyTypes = 'MAP_BOX_URL' | 'MAP_BOX_TOKEN';

const errorMessage = (message: string) => `user ${message} do not exists`;

describe('AddressesService', () => {
  let service: AddressesService;
  let repoAddress: Repository<AddressEntity>;
  let profileService: ProfileService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        AddressesService,
        ErrorService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: KeyTypes) => {
              switch (key) {
                case 'MAP_BOX_TOKEN':
                  return 'mock_token';

                case 'MAP_BOX_URL':
                  return 'https://mock.com';

                default:
                  return null;
              }
            }),
          },
        },
        {
          provide: ProfileService,
          useValue: {
            findByUserId: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneOrFail: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    repoAddress = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
    service = module.get<AddressesService>(AddressesService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repoAddress).toBeDefined();
      expect(profileService).toBeDefined();
    });
  });

  describe('Find One', () => {
    it('should return one address', async () => {
      const addressId = faker.datatype.uuid();
      const userId = faker.datatype.uuid();
      const mockAddress = MockAddress(addressId);

      const findOneSpy = jest
        .spyOn(repoAddress, 'findOneOrFail')
        .mockResolvedValue(mockAddress);

      const data = await service.findOne(addressId, userId);

      expect(data).toEqual(mockAddress);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: addressId, profile: { user: { id: userId } } },
      });
    });

    it('should return http exception if some service fails', async () => {
      // CONFIGURATION
      const addressId = faker.datatype.uuid();
      const userId = faker.datatype.uuid();
      const message = `Address id ${addressId} not found`;

      // CALL FUNCTION
      jest
        .spyOn(repoAddress, 'findOneOrFail')
        .mockImplementationOnce(() => Promise.reject({ code: 404, message }));

      // TESTING
      await expect(service.findOne(addressId, userId)).rejects.toThrow(
        new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('Find All', () => {
    it('should return all address', async () => {
      const userId = faker.datatype.uuid();
      const addressOne = MockFullAddress(faker.datatype.uuid());
      const addressTwo = MockFullAddress(faker.datatype.uuid());
      const addressThree = MockFullAddress(faker.datatype.uuid());

      const findSpy = jest
        .spyOn(repoAddress, 'find')
        .mockResolvedValue([addressOne, addressTwo, addressThree]);

      const data = await service.findAll(userId);

      expect(findSpy).toHaveBeenCalledWith({
        where: { profile: { user: { id: userId } } },
      });
      expect(data).toEqual([addressOne, addressTwo, addressThree]);
    });

    it('should return http exception when service to find all addresses', async () => {
      // CONFIGURATION
      const userId = faker.datatype.uuid();
      const message = `No addresses found to user_id: ${userId}`;

      // CALL FUNCTION
      jest
        .spyOn(repoAddress, 'find')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(service.findAll(userId)).rejects.toThrow(
        new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('Create', () => {
    it('should return a Address entity when was created when user not have more than one address', async () => {
      // CONFIGURATION
      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };
      const addressId = faker.datatype.uuid();
      const AddressCreated = MockCreateAddress(addressId, createDto, user.id);
      // CALL FUNCTION

      const createSpy = jest
        .spyOn(repoAddress, 'create')
        .mockReturnValue(AddressCreated);

      const saveSpy = jest
        .spyOn(repoAddress, 'save')
        .mockResolvedValue(AddressCreated);

      const mockProfile: ProfileEntity = {
        create_date_time: faker.date.past(),
        father_last_name: faker.name.lastName(),
        id: faker.datatype.uuid(),
        last_changed_date_time: faker.date.recent(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        user: null,
      };

      const profile = jest
        .spyOn(profileService, 'findByUserId')
        .mockResolvedValue(mockProfile);

      const data = await service.create(createDto, user);

      // TESTING
      expect(createSpy).toHaveBeenCalledWith(createDto);
      expect(profile).toHaveBeenCalledWith(user);
      expect(saveSpy).toHaveBeenCalled();
      expect(data).toEqual(AddressCreated);
    });

    it('should return address entity as default when user has more than one address', async () => {
      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      const addressId = faker.datatype.uuid();

      const AddressCreated = MockCreateAddress(addressId, createDto, user.id);

      const findProfileSpy = jest
        .spyOn(profileService, 'findByUserId')
        .mockResolvedValue(MockProfile(user.id));

      const createSpy = jest
        .spyOn(repoAddress, 'create')
        .mockReturnValue(AddressCreated);

      const saveSpy = jest
        .spyOn(repoAddress, 'save')
        .mockResolvedValue(AddressCreated);

      const data = await service.create(createDto, user);
      expect(findProfileSpy).toHaveBeenCalledWith(user);
      expect(createSpy).toHaveBeenCalledWith(createDto);
      expect(saveSpy).toHaveBeenCalled();
      expect(data).toEqual(AddressCreated);
    });

    it('should return http exception when creation service fails', async () => {
      // CONFIGURATION
      const dto: CreateAddressDto = {
        address_line: faker.address.streetAddress(),
        address_number_exterior: faker.address.buildingNumber(),
        coordinates: [
          Number(faker.address.latitude()),
          Number(faker.address.longitude()),
        ],
        full_address: faker.address.streetAddress(),
        iso_code: 'MX-HID',
        postal_code: faker.address.zipCode(),
      };

      const user: Usertype = {
        id: faker.datatype.uuid(),
        role: UserRole.DENTIST,
      };

      const message = `no profile found to: ${user.id}`;

      // CALL FUNCTION
      jest
        .spyOn(profileService, 'findByUserId')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(service.create(dto, user)).rejects.toThrow(
        new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('Remove', () => {
    it('should return success when address was deleted', async () => {
      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      const addressId = faker.datatype.uuid();
      const profileId = faker.datatype.uuid();

      const findProfileSpy = jest
        .spyOn(profileService, 'findByUserId')
        .mockResolvedValue(MockProfile(profileId));

      const deleteSpy = jest
        .spyOn(repoAddress, 'delete')
        .mockResolvedValue({ affected: 1, raw: [] });

      const data = await service.remove(addressId, user);

      expect(data).toBe(`Address ${addressId} was deleted successful`);
      expect(deleteSpy).toHaveBeenCalledWith({
        id: addressId,
        profile: { id: profileId },
      });
      expect(findProfileSpy).toHaveBeenCalledWith(user);
    });

    it('should return http exception when no deleted address', async () => {
      // CONFIGURATION
      const profileMock: ProfileEntity = {
        create_date_time: faker.date.past(),
        father_last_name: faker.name.lastName(),
        id: faker.datatype.uuid(),
        last_changed_date_time: faker.date.past(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        user: undefined,
      };

      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      const addressId = faker.datatype.uuid();
      const message = `user Address ${addressId} no exists do not exists`;

      // CALL FUNCTION
      jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profileMock);
      jest.spyOn(repoAddress, 'delete').mockResolvedValue({
        affected: 0,
        raw: [],
      });

      // TESTING
      await expect(service.remove(addressId, user)).rejects.toThrow(
        new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('Update Address', () => {
    it('should return string success when address was updated correctly', async () => {
      // CONFIGURATION
      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      const addressId = faker.datatype.uuid();
      const profileId = faker.datatype.uuid();

      // CALL FUNCTIONS
      const profileServiceSpy = jest
        .spyOn(profileService, 'findByUserId')
        .mockResolvedValue(MockProfile(profileId));

      const updateSpy = jest
        .spyOn(repoAddress, 'update')
        .mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });

      const data = await service.update(addressId, updateDto, user);

      // TESTING
      expect(profileServiceSpy).toHaveBeenCalledWith(user);
      expect(updateSpy).toHaveBeenCalledWith(
        { id: addressId, profile: { id: profileId } },
        updateDto,
      );
      expect(data).toBe(`Address ${addressId} was updated successfully`);
    });

    it('should return https exception when update service fails', async () => {
      // CONFIGURATION
      const addressId = faker.datatype.uuid();
      const user: Usertype = {
        id: faker.datatype.uuid(),
        role: UserRole.DENTIST,
      };
      const updateDto: UpdateAddressDto = {
        address_line: faker.address.streetAddress(),
        address_number_exterior: faker.address.buildingNumber(),
        address_number_interior: faker.address.buildingNumber(),
        coordinates: [
          Number(faker.address.latitude()),
          Number(faker.address.longitude()),
        ],
        country: 'MX',
        full_address: faker.address.streetAddress(),
        iso_code: 'MX-HID',
        postal_code: faker.address.zipCode(),
        suburb: faker.address.state(),
      };
      const message = `address ${addressId} not found`;

      const mockProfile: ProfileEntity = {
        create_date_time: faker.date.past(),
        father_last_name: faker.name.lastName(),
        id: faker.datatype.uuid(),
        last_changed_date_time: faker.date.recent(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        user: null,
      };

      // CALL FUNCTION
      jest.spyOn(profileService, 'findByUserId').mockResolvedValue(mockProfile);

      jest
        .spyOn(repoAddress, 'update')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(service.update(addressId, updateDto, user)).rejects.toThrow(
        new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
      );
    });

    it('should return http exception when updateAddress not update any address', async () => {
      // CONFIGURATION
      const addressId = faker.datatype.uuid();
      const user: Usertype = {
        id: faker.datatype.uuid(),
        role: UserRole.DENTIST,
      };
      const updateDto: UpdateAddressDto = {
        address_line: faker.address.streetAddress(),
        address_number_exterior: faker.address.buildingNumber(),
        address_number_interior: faker.address.buildingNumber(),
        coordinates: [
          Number(faker.address.latitude()),
          Number(faker.address.longitude()),
        ],
        country: 'MX',
        full_address: faker.address.streetAddress(),
        iso_code: 'MX-HID',
        postal_code: faker.address.zipCode(),
        suburb: faker.address.state(),
      };
      const message = `user Address ${addressId} not exists do not exists`;

      const mockProfile: ProfileEntity = {
        create_date_time: faker.date.past(),
        father_last_name: faker.name.lastName(),
        id: faker.datatype.uuid(),
        last_changed_date_time: faker.date.recent(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        user: null,
      };

      // CALL FUNCTION
      jest.spyOn(profileService, 'findByUserId').mockResolvedValue(mockProfile);
      jest.spyOn(repoAddress, 'update').mockResolvedValue({
        affected: 0,
        raw: [],
        generatedMaps: [],
      });

      // TESTING
      await expect(service.update(addressId, updateDto, user)).rejects.toThrow(
        new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
      );
    });
  });
});
