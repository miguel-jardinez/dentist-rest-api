import { UserModel } from '../../types/UserModel';
import { UserRole } from '../../../utils/RoleEnum';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { faker } from '@faker-js/faker';

export const EMAIL_MOCK = 'test@email.com';
export const PASSWORD_MOCK = 'test_password';
export const USERNAME_MOCK = 'test_username';
export const ID_MOCK = 'id_mock';

export const LIST_USERS_MOCK: UserEntity[] = [
  {
    id: faker.datatype.uuid(),
    password: faker.internet.password(),
    role: UserRole.DENTIST,
    email: faker.internet.email(),
    is_email_verified: true,
    is_phone_verified: true,
    is_active: true,
    create_date_time: faker.date.past(),
    last_changed_date_time: faker.date.recent(),
  },
  {
    id: faker.datatype.uuid(),
    password: faker.internet.password(),
    role: UserRole.DENTIST,
    email: faker.internet.email(),
    is_email_verified: true,
    is_phone_verified: true,
    is_active: true,
    create_date_time: faker.date.past(),
    last_changed_date_time: faker.date.recent(),
  },
];

export const OneUserMockId = (id: string): UserEntity => {
  return {
    id,
    create_date_time: faker.date.past(),
    is_active: false,
    is_email_verified: false,
    is_phone_verified: false,
    last_changed_date_time: faker.date.recent(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: UserRole.PATIENT,
  };
};

export const OneUserMockIdService = {
  id: ID_MOCK,
  email: EMAIL_MOCK,
  password: PASSWORD_MOCK,
  username: USERNAME_MOCK,
  role: UserRole.DENTIST,
};

export const OneUserMockEmail = (email: string): UserEntity => {
  return {
    id: faker.datatype.uuid(),
    create_date_time: faker.date.past(),
    is_active: false,
    is_email_verified: false,
    is_phone_verified: false,
    last_changed_date_time: faker.date.recent(),
    email: email,
    password: faker.internet.password(),
    role: UserRole.PATIENT,
  };
};

export const OneUserMockEmailService = {
  id: ID_MOCK,
  email: EMAIL_MOCK,
  password: PASSWORD_MOCK,
  username: USERNAME_MOCK,
  role: UserRole.DENTIST,
};

export const InsertUserMock = (user: CreateUserDto): UserEntity => {
  return {
    ...user,
    id: ID_MOCK,
    is_phone_verified: true,
    is_email_verified: true,
    is_active: true,
    profile: null,
    last_changed_date_time: faker.date.recent(),
    create_date_time: faker.date.past(),
  };
};

export const InsertUserMockService = {
  email: EMAIL_MOCK,
  id: ID_MOCK,
  password: PASSWORD_MOCK,
  role: UserRole.DENTIST,
  username: USERNAME_MOCK,
} as UserModel;

export const UsersArrayMocks = LIST_USERS_MOCK;
