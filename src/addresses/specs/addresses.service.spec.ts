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
import { MockAddressMapBox } from './mocks/mapBox.mock';
import { createDto, updateDto } from './mocks/dtos.mock';
import { Usertype } from '../../utils/types/User';
import { UserRole } from '../../utils/RoleEnum';

type KeyTypes = 'MAP_BOX_URL' | 'MAP_BOX_TOKEN';

describe('AddressesService', () => {
  let service: AddressesService;
  let repoAddress: Repository<AddressEntity>;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        AddressesService,
        ErrorService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(() => {
                return {
                  data: {
                    ...MockAddressMapBox,
                  },
                };
              }),
            },
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
  });

  describe('Create', () => {
    it('should return a Address entity when was created when user not have more than one address', async () => {
      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      const addressId = faker.datatype.uuid();

      const AddressCreated = MockCreateAddress(addressId, createDto, user.id);
      const AddressCreatedTwo = MockCreateAddress(
        addressId,
        createDto,
        user.id,
      );
      const AddressCreatedThree = MockCreateAddress(
        addressId,
        createDto,
        user.id,
      );

      const findAllAddress = jest
        .spyOn(repoAddress, 'find')
        .mockResolvedValue([
          AddressCreated,
          AddressCreatedTwo,
          AddressCreatedThree,
        ]);

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
      expect(findAllAddress).toHaveBeenCalledWith({
        where: { profile: { user: { id: user.id } } },
      });
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
  });

  describe('Get Addresses', () => {
    it('should return address information', async () => {
      const address_string = faker.address.streetAddress();
      const data = await service.getAddresses(address_string);

      expect(data).toEqual(MockAddressMapBox);
    });
  });

  describe('Update Address', () => {
    it('should return string success when address was updated correctly', async () => {
      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      const addressId = faker.datatype.uuid();
      const profileId = faker.datatype.uuid();

      const findAll = jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const profileServiceSpy = jest
        .spyOn(profileService, 'findByUserId')
        .mockResolvedValue(MockProfile(profileId));

      const updateSpy = jest
        .spyOn(repoAddress, 'update')
        .mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });

      const data = await service.update(addressId, updateDto, user);
      expect(profileServiceSpy).toHaveBeenCalledWith(user);
      expect(findAll).toHaveBeenCalledWith(user);
      expect(updateSpy).toHaveBeenCalledWith(
        { id: addressId, profile: { id: profileId } },
        updateDto,
      );
      expect(data).toBe(`Address ${addressId} was updated successfully`);
    });
  });
});
