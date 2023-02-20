import { UserRole } from '../../utils/RoleEnum';
import { SetMetadata } from '@nestjs/common';

export const RolesAuth = (...roles: UserRole[]) => SetMetadata('roles', roles);
