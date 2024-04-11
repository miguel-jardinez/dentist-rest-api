import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@utils/RoleEnum';

export const RolesAuth = (...roles: UserRole[]) => SetMetadata('roles', roles);
