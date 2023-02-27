import { UserModel } from '../../types/UserModel';
import { UserRole } from '../../../utils/RoleEnum';
import { CreateUserDto } from '../../dto/create-user.dto';

export const EMAIL_MOCK = 'test@email.com';
export const PASSWORD_MOCK = 'test_password';
export const USERNAME_MOCK = 'test_username';
export const ID_MOCK = 'id_mock';

export const LIST_USERS_MOCK: UserModel[] = [
  {
    id: `${ID_MOCK}_1`,
    password: `${PASSWORD_MOCK}_1`,
    email: `${EMAIL_MOCK}_1`,
    role: UserRole.DENTIST,
  },
  {
    id: `${ID_MOCK}_2`,
    password: `${PASSWORD_MOCK}_2`,
    email: `${EMAIL_MOCK}_2`,
    role: UserRole.PATIENT,
  },
  {
    id: `${ID_MOCK}_3`,
    password: `${PASSWORD_MOCK}_3`,
    email: `${EMAIL_MOCK}_3`,
    role: UserRole.PATIENT,
  },
];

export const OneUserMockId = (id: string): UserModel => {
  return {
    id,
    email: EMAIL_MOCK,
    password: PASSWORD_MOCK,
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

export const OneUserMockEmail = (email): UserModel => {
  return {
    id: ID_MOCK,
    email,
    password: PASSWORD_MOCK,
    role: UserRole.DENTIST,
  };
};

export const OneUserMockEmailService = {
  id: ID_MOCK,
  email: EMAIL_MOCK,
  password: PASSWORD_MOCK,
  username: USERNAME_MOCK,
  role: UserRole.DENTIST,
};

export const InsertUserMock = (user: CreateUserDto) => {
  return {
    ...user,
    id: ID_MOCK,
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
