import { UserEntity } from '../entities/user.entity';
import { ResponseApi } from '@utils/ResponseApi';
import { DeleteResult } from 'typeorm';

export interface UserControllerInterface {
  findAllUsers: () => Promise<ResponseApi<UserEntity[]>>;
  findUserById: (id: string) => Promise<ResponseApi<UserEntity>>;
  removeUser: (id: string) => Promise<ResponseApi<DeleteResult>>;
}
