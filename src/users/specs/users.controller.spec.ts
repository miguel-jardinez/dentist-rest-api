import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '../../utils/RoleEnum';
import { MockUserService } from './mocks/MockUserService';

const MOCK_ID = 'mock_id';

describe('UserController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const StudentServiceProvider = {
      provide: UsersService,
      useClass: MockUserService,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [StudentServiceProvider],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('Controller should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Find all users', () => {
    it('should return all users array', async () => {
      const serviceSpy = jest.spyOn(userService, 'findAll');

      const data = await userController.findAll();

      expect(serviceSpy).toHaveBeenCalled();
      expect(data[0]).toEqual({
        id: 'id_mock_1',
        username: 'test_username_1',
        password: 'test_password_1',
        email: 'test@email.com_1',
        role: UserRole.DENTIST,
      });
    });
  });

  describe('FindById', () => {
    it('should return user by id when id is correct', async () => {
      const serviceSpy = jest.spyOn(userService, 'findById');
      const data = await userController.findOne(MOCK_ID);

      expect(serviceSpy).toHaveBeenCalled();
      expect(data.id).toBe(MOCK_ID);
    });
  });

  describe('Remove', () => {
    it('should return strin when user was deleted successfully', async () => {
      const serviceSpy = jest.spyOn(userService, 'remove');
      const data = await userController.remove(MOCK_ID);

      expect(serviceSpy).toHaveBeenCalled();
      expect(data).toBe(`User ${MOCK_ID} was deleted successfully`);
    });
  });

  describe('Create', () => {
    it('should return userEntity when pass dto', async () => {
      const serviceSpy = jest.spyOn(userService, 'create');
      const userDto = {
        email: 'mock_id',
        password: 'test_password',
        role: UserRole.PATIENT,
        username: 'test_username',
      };

      const data = await userController.create(userDto);

      expect(serviceSpy).toHaveBeenCalled();
      expect(serviceSpy).toHaveBeenCalledWith({
        email: 'mock_id',
        password: 'test_password',
        role: UserRole.PATIENT,
        username: 'test_username',
      });
      expect(data.role).toBe(UserRole.PATIENT);
      expect(data).toHaveProperty('id');
    });
  });
});
