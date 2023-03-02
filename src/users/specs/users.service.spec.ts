import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorService } from '../../utils/ErrorService';
import { ConfigService } from '@nestjs/config';
import {
  InsertUserMock,
  LIST_USERS_MOCK,
  OneUserMockEmail,
  OneUserMockId,
} from './mocks/mocks';
import { createMock } from '@golevelup/ts-jest';
import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from '../../utils/RoleEnum';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ErrorService,
        ConfigService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: createMock<Repository<UserEntity>>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('FIND ALL', () => {
    it('should return all users from database', async () => {
      // CONFIGURATION
      // CALL FUNCTIONS
      const findAllSpy = jest
        .spyOn(repo, 'find')
        .mockResolvedValue(LIST_USERS_MOCK);
      const response = await service.findAll();

      // TESTING
      expect(findAllSpy).toHaveBeenCalledWith({ relations: { profile: true } });
      expect(response).toHaveLength(2);
    });
  });

  describe('FIND BY ID', () => {
    it('should return one user when pass id', async () => {
      // CONFIGURATION
      const userId = faker.datatype.uuid();
      const mockUserId = OneUserMockId(userId);

      // CALL FUNCTIONS
      const repoSpy = jest
        .spyOn(repo, 'findOneOrFail')
        .mockResolvedValue(mockUserId);

      const response = await service.findById(userId);

      // TESTING
      expect(response).toEqual(mockUserId);
      expect(repoSpy).toBeCalledWith({
        where: { id: userId },
        relations: { profile: true },
      });
    });

    it('should return http exception when not found user', async () => {
      // CONFIGURATION
      const userId = faker.datatype.uuid();
      const message = `user ${userId} do not exists`;

      // CALL FUNCTIONS
      jest
        .spyOn(repo, 'findOneOrFail')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(service.findById(userId)).rejects.toThrow(
        new HttpException(
          `user ${message} do not exists`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('FIND BY EMAIL', () => {
    it('should return one user when pass email', async () => {
      // CONFIGURATION
      const email = faker.internet.email();
      const mockUser = OneUserMockEmail(email);

      // CALL FUNCTIONS
      const repoSpy = jest.spyOn(repo, 'findOne').mockResolvedValue(mockUser);
      const response = await service.findByEmail(email);

      // TESTING
      expect(response).toBe(mockUser);

      expect(repoSpy).toBeCalledWith({
        where: { email: email },
      });
    });

    it('should return http exception when find service by email fails', async () => {
      // CONFIGURATION
      const email = faker.internet.email();
      const message = `user ${email} not found`;

      // CALL FUNCTION
      jest
        .spyOn(repo, 'findOne')
        .mockImplementationOnce(() => Promise.reject({ code: '404', message }));

      // TESTING
      await expect(service.findByEmail(email)).rejects.toThrow(
        new HttpException(
          `user ${message} do not exists`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('REMOVE', () => {
    it('should remove user when pass id', async () => {
      // CONFIGURATION
      const userId = faker.datatype.uuid();

      // CALL FUNCTIONS
      const repoSpy = jest.spyOn(repo, 'delete').mockResolvedValue({
        raw: [],
        affected: 1,
      });
      const response = await service.remove(userId);

      // TESTING
      expect(response).toBe(`User ${userId} was deleted successfully`);
      expect(repoSpy).toBeCalledWith({ id: userId });
    });

    it('should return http exception if user was not deleted', async () => {
      // CONFIGURATION
      const userId = faker.datatype.uuid();
      const message = `Please contact service care or try again`;

      // CALL FUNCTIONS
      jest.spyOn(repo, 'delete').mockResolvedValue({
        raw: [],
        affected: 0,
      });

      // TESTING
      await expect(service.remove(userId)).rejects.toThrow(
        new HttpException(message, HttpStatus.BAD_GATEWAY),
      );
    });
  });

  describe('CREATE', () => {
    it('should create a user and save it when dto is passed', async () => {
      // CONFIGURATION
      const dto: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: UserRole.DENTIST,
      };
      const userMock = InsertUserMock(dto);

      // CALL FUNCTIONS
      const createSpy = jest.spyOn(repo, 'create').mockReturnValue(userMock);
      const saveSpy = jest.spyOn(repo, 'save').mockResolvedValueOnce(userMock);
      const response = await service.create(dto);

      // TESTING
      expect(response).toEqual(userMock);
      expect(createSpy).toHaveBeenCalledWith(dto);
      expect(saveSpy).toHaveBeenCalledWith(userMock);
    });

    it('should return http exception when save service fails', async () => {
      const dto: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: UserRole.DENTIST,
      };
      const userMock = InsertUserMock(dto);
      const message = 'Error mock';

      // CALL FUNCTIONS
      jest.spyOn(repo, 'create').mockReturnValue(userMock);
      jest
        .spyOn(repo, 'save')
        .mockImplementationOnce(() => Promise.reject({ code: '401', message }));

      // TESTING
      await expect(service.create(dto)).rejects.toThrow(
        new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });

  describe('FIND BY REGION', () => {
    it('should return user entity list if was found by region', async () => {
      // CONFIGURATION
      const email = faker.internet.email();
      const userMock = OneUserMockEmail(email);
      const regionCode = 'MX-HID';

      // CALL FUNCTION
      const findSpy = jest.spyOn(repo, 'find').mockResolvedValue([userMock]);
      const data = await service.findDentistByRegion(regionCode);

      // TESTING
      expect(data).toHaveLength(1);
      expect(findSpy).toHaveBeenCalledWith({
        relations: {
          profile: { address: true, license: true, services: true },
        },
        where: {
          profile: { address: { iso_code: regionCode } },
          role: UserRole.DENTIST,
        },
      });
    });

    it('should return http exception if find fails', async () => {
      // CONFIGURATION
      const message = 'Mock error';
      const regionCode = 'MX-HID';

      // CALL FUNCTIONS
      jest
        .spyOn(repo, 'find')
        .mockImplementationOnce(() => Promise.reject({ code: '401', message }));

      // TESTING
      await expect(service.findDentistByRegion(regionCode)).rejects.toThrow(
        new HttpException(message, HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('FIND DENTIST BY ID', () => {
    it('should return user entity if was found by id', async () => {
      // CONFIGURATION
      const id = faker.datatype.uuid();
      const userMock = OneUserMockId(id);

      // CALL FUNCTION
      const findSpy = jest
        .spyOn(repo, 'findOneOrFail')
        .mockResolvedValue(userMock);

      const data = await service.findDentistById(id);

      // TESTING
      expect(data).toEqual(userMock);
      expect(findSpy).toHaveBeenCalledWith({
        where: {
          role: UserRole.DENTIST,
          id,
        },
        relations: {
          profile: {
            services: true,
            address: true,
            license: true,
          },
        },
      });
    });

    it('should return http exception if find one fails', async () => {
      // CONFIGURATION
      const message = 'Mock error';
      const id = faker.datatype.uuid();

      // CALL FUNCTIONS
      jest
        .spyOn(repo, 'findOneOrFail')
        .mockImplementationOnce(() => Promise.reject({ code: '401', message }));

      // TESTING
      await expect(service.findDentistById(id)).rejects.toThrow(
        new HttpException(message, HttpStatus.NOT_FOUND),
      );
    });
  });
});
