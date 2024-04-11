import { UserEntity } from '@features/users/entities/user.entity';

export interface DentistProfileEntityInterface {
  id?: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  user: UserEntity;
  license: string;
  licenceUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
