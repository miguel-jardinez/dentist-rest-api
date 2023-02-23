import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorService } from '../../utils/ErrorService';
import { ConfigService } from '@nestjs/config';
import {
  EMAIL_MOCK,
  ID_MOCK,
  InsertUserMockService,
  LIST_USERS_MOCK,
  OneUserMockEmailService,
  OneUserMockIdService,
} from './mocks/mocks';

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
          useValue: {
            find: jest.fn().mockResolvedValue(LIST_USERS_MOCK),
            findOneOrFail: jest.fn().mockReturnValue(OneUserMockEmailService),
            findOne: jest.fn().mockReturnValue(OneUserMockIdService),
            create: jest.fn().mockReturnValue(InsertUserMockService),
            delete: jest.fn().mockReturnValue({ affected: 1 }),
            save: jest.fn().mockReturnValue(InsertUserMockService),
          },
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

  describe('findAll', () => {
    it('should return all users from database', async () => {
      const response = await service.findAll();
      expect(response[0].id).toBeDefined();
      expect(response[0].id).toBe('id_mock_1');
      expect(response).toEqual(LIST_USERS_MOCK);
    });
  });

  describe('FindById', () => {
    it('should return one user when pass id', async () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      const response = await service.findById(ID_MOCK);

      expect(response.id).toBe(ID_MOCK);
      expect(response).toEqual(OneUserMockIdService);

      expect(repoSpy).toBeCalledWith({
        where: { id: ID_MOCK },
        relations: { profile: true },
      });
    });
  });

  describe('FindByEmail', () => {
    it('should return one user when pass id', async () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      const response = await service.findByEmail(EMAIL_MOCK);

      expect(response.email).toBe(EMAIL_MOCK);
      expect(response).toEqual(OneUserMockEmailService);

      expect(repoSpy).toBeCalledWith({
        where: { email: EMAIL_MOCK },
      });
    });
  });

  describe('Remove', () => {
    it('should remove user when pass id', async () => {
      const repoSpy = jest.spyOn(repo, 'delete');
      const response = await service.remove(ID_MOCK);

      expect(response).toBe(`User ${ID_MOCK} was deleted successfully`);
      expect(repoSpy).toBeCalledWith({ id: ID_MOCK });
    });
  });

  describe('Create', () => {
    it('should create a user and save it when dto is passed', async () => {
      const response = await service.create(OneUserMockEmailService);
      expect(response).toEqual(OneUserMockIdService);
      expect(repo.create).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
    });
  });
});
