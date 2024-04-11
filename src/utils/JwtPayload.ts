import { UserRole } from '@utils/RoleEnum';

export interface JwtPayload {
  profileId: string;
  id: string;
  role: UserRole;
}
