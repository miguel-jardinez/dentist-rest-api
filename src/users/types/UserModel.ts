import { UserRole } from '../../utils/RoleEnum';

export interface UserModel {
  id?: string;

  email: string;

  password: string;

  role: UserRole;
}
