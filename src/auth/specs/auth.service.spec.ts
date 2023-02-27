import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { ErrorService } from '../../utils/ErrorService';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { UserMock } from '../../profile/specs/mocks/user.mock';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserRole } from '../../utils/RoleEnum';
import { CreateUserDto } from '../../users/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let errorService: ErrorService;
  let jwtService: JwtService;
  let repo: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        ErrorService,
        JwtService,
        ConfigService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    errorService = module.get<ErrorService>(ErrorService);
    jwtService = module.get<JwtService>(JwtService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('Should be defined', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
      expect(userService).toBeDefined();
      expect(errorService).toBeDefined();
      expect(jwtService).toBeDefined();
      expect(repo).toBeDefined();
    });
  });

  describe('ValidUserWithCredentials', () => {
    it('should return user when credentials are correct', async () => {
      const userSpy = jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue(UserMock);

      const checkPassword = jest
        .spyOn(authService, <any>'validateUserPassword')
        .mockResolvedValue(true);

      const data = await authService.validateUserCredentials(
        UserMock.email,
        UserMock.password,
      );

      expect(checkPassword).toHaveBeenCalled();
      expect(userSpy).toHaveBeenCalled();
      expect(data.id).toBe(UserMock.id);
    });

    it('Should reject service with error 401 password or username incorrect', async () => {
      const message = 'email or password incorrect';

      jest
        .spyOn(authService, <any>'validateUserPassword')
        .mockResolvedValue(false);

      await expect(
        authService.validateUserCredentials(UserMock.email, UserMock.password),
      ).rejects.toThrowError(
        new HttpException(message, HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('GetJsonWebToken', () => {
    it('should return web token with payload is passed', async () => {
      const fakeToken = faker.datatype.uuid();
      const id = faker.datatype.uuid();
      const role = UserRole.PATIENT;

      const jwtSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue(fakeToken);

      const data = await authService.getJsonWebToken(id, role);

      expect(jwtSpy).toHaveBeenCalled();
      expect(jwtSpy).toHaveBeenCalledWith({ id, role });
      expect(data).toBe(fakeToken);
    });
  });

  describe('Register', () => {
    it('should create user when dto is correct', async () => {
      const registerDto: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: UserRole.PATIENT,
      };

      const createSpy = jest
        .spyOn(userService, 'create')
        .mockResolvedValue(UserMock);

      const data = await authService.register(registerDto);

      expect(createSpy).toHaveBeenCalledWith(registerDto);
      expect(data).toEqual(UserMock);
      expect(createSpy).toHaveBeenCalled();
    });
  });
});
