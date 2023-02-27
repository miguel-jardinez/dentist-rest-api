import { UserEntity } from '../../users/entities/user.entity';

export interface InterfaceController {
  getAllDentistRegion: (state: string) => Promise<UserEntity[]>;

  getOneDentist: (id: string) => Promise<UserEntity>;
}
