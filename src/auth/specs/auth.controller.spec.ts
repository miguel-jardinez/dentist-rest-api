import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ErrorService } from '../../utils/ErrorService';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../utils/RoleEnum';
import { UserMock } from '../../profile/specs/mocks/user.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UsersService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        AuthService,
        UsersService,
        JwtService,
        ErrorService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'API_JWT_SECRET') {
                return 'mock_secret';
              }
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(authService).toBeDefined();
      expect(userService).toBeDefined();
      expect(configService).toBeDefined();
    });
  });

  describe('Register', () => {
    it('should return user when register was successfully', async () => {
      const dataDto: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: UserRole.PATIENT,
      };

      const createSpy = jest
        .spyOn(userService, 'create')
        .mockResolvedValue(UserMock);

      const data = await controller.register(dataDto);

      expect(data).toEqual(UserMock);
      expect(createSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith(dataDto);
    });

    it('should throw error if creation failed', async () => {
      const errorMessage = 'Error message';
      const dataDto: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: UserRole.PATIENT,
      };

      jest
        .spyOn(userService, 'create')
        .mockImplementation(() =>
          Promise.reject(
            new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR),
          ),
        );

      await expect(controller.register(dataDto)).rejects.toThrowError(
        errorMessage,
      );
    });
  });
});
