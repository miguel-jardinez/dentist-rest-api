import { UserEntity } from '../../users/entities/user.entity';

export class InterfaceService {
  getAllDentist: (state: string) => Promise<UserEntity[]>;

  getOneDentist: (id: string) => Promise<UserEntity>;
}
