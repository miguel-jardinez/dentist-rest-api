import { UserEntity } from '../../users/entities/user.entity';

export interface ProfileInterface {
  id?: string;

  first_name: string;

  last_name: string;

  phone_number?: string;

  user?: UserEntity;
}
