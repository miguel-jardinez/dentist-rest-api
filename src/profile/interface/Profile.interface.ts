import { UserEntity } from '../../users/entities/user.entity';

export interface ProfileInterface {
  id?: string;

  name: string;

  father_last_name: string;

  mother_last_name?: string;

  phone_number?: string;

  user?: UserEntity;
}
