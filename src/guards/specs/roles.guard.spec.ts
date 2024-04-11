import { RolesGuard } from '../roles/roles.guard';
import { Reflector } from '@nestjs/core';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../features/users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../utils/RoleEnum';
import { Test, TestingModule } from '@nestjs/testing';

describe('Roles Guard', () => {
  let guard: RolesGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            constructor: jest.fn(),
            get: jest.fn((key: string) => {
              switch (key) {
                case 'roles':
                  return [UserRole.DENTIST];
              }
            }),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
  });

  describe('Defined', () => {
    it('should guard be defined', () => {
      expect(guard).toBeDefined();
    });
  });

  describe('Guard Role', () => {
    it('should return true if the role it is correct', async () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getRequest.mockReturnValue({
        user: <UserEntity>{
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: UserRole.DENTIST,
          services: [],
          username: faker.internet.userName(),
          id: faker.datatype.uuid(),
          profile: null,
          lastChangedDateTime: faker.date.recent(),
          createDateTime: faker.date.past(),
          async hashPassword(): Promise<void> {
            console.log('hashing');
          },
        },
      });

      const data = guard.canActivate(context);
      expect(data).toBeTruthy();
    });

    it('should return false if the role it is correct', async () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getRequest.mockReturnValue({
        user: <UserEntity>{
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: UserRole.CUSTOMER,
          services: [],
          username: faker.internet.userName(),
          id: faker.datatype.uuid(),
          profile: null,
          lastChangedDateTime: faker.date.recent(),
          createDateTime: faker.date.past(),
          async hashPassword(): Promise<void> {
            console.log('hashing');
          },
        },
      });

      const data = guard.canActivate(context);
      expect(data).not.toBeTruthy();
    });
  });
});
