import { UserRole } from '@utils/RoleEnum';

export interface CreateUserDtoInterface {
  email: string;
  password: string;
  role: UserRole;
}
