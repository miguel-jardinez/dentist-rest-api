import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../profile.service';
import { ErrorService } from '../../utils/ErrorService';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { faker } from '@faker-js/faker';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Usertype } from '../../utils/types/User';
import { UserRole } from '../../utils/RoleEnum';

describe('ProfileService', () => {
  let service: ProfileService;
  let errorService: ErrorService;
  let repo: Repository<ProfileEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        ErrorService,
        {
          provide: getRepositoryToken(ProfileEntity),
          useValue: {
            findOneOrFail: jest.fn(),
            update: jest.fn(),
            create: jest.fn,
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    errorService = module.get<ErrorService>(ErrorService);
    repo = module.get<Repository<ProfileEntity>>(
      getRepositoryToken(ProfileEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
    expect(errorService).toBeDefined();
  });

  describe('FindUserById', () => {
    it('should return userEntity where id was passed', async () => {
      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      const jestSpy = jest.spyOn(repo, 'findOneOrFail').mockResolvedValue({
        name: faker.name.fullName(),
        mother_last_name: faker.name.lastName(),
        phone_number: faker.phone.number(),
        id: faker.datatype.uuid(),
        user: null,
        address: null,
      } as ProfileEntity);

      const data = await service.findByUserId(user);

      expect(jestSpy).toBeCalled();
      expect(data.id).toBe('mock_id');
    });

    it('should call error service if repository fire error', async () => {
      const errorText = 'user User was not found do not exists';

      const errorSpy = jest.spyOn(errorService, 'errorHandling');
      const jestSpy = jest.spyOn(repo, 'findOneOrFail').mockRejectedValue({
        message: 'User was not found',
      });

      const user = <Usertype>{
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      await expect(service.findByUserId(user)).rejects.toThrowError(
        new HttpException(errorText, HttpStatus.NOT_FOUND),
      );

      expect(jestSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalled();
    });
  });

  describe('Update', () => {
    it('should return string success update when repository return a user affect', async () => {
      const mockId = 'mock_id';
      const mockDataUpdate = <UpdateProfileDto>{
        first_name: 'new_mock_first_name',
      };

      jest
        .spyOn(repo, 'update')
        .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });

      const data = await service.update(mockId, mockDataUpdate);

      expect(repo.update).toHaveBeenCalled();
      expect(data).toBe(`User ${mockId} has been updated successfully`);
    });

    it('should return user not exist if id is wrong', async () => {
      const mockId = 'mock_id';
      const mockDataUpdate = <UpdateProfileDto>{
        first_name: 'new_mock_first_name',
      };

      jest
        .spyOn(repo, 'update')
        .mockResolvedValue({ affected: 0, raw: {}, generatedMaps: [] });

      const data = await service.update(mockId, mockDataUpdate);

      expect(repo.update).toHaveBeenCalled();
      expect(data).toBe(`User ${mockId} not exists`);
    });
  });

  describe('Create new profile', () => {
    it('should return string and call create and save repo functions', async () => {
      const CreateProfileDto: CreateProfileDto = {
        name: faker.name.fullName(),
        father_last_name: faker.name.lastName(),
        mother_last_name: faker.name.lastName(),
        phone_number: faker.phone.number(),
      };

      const createSpy = jest.spyOn(repo, 'create');
      const saveSpy = jest.spyOn(repo, 'save');

      const data = await service.create(CreateProfileDto, 'mock_user_id');

      expect(createSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
      expect(data).toBe('Profile added Successfully');
    });
  });
});
