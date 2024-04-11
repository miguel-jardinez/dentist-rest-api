import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { DeleteResult } from 'typeorm';

export interface UserControllerInterface {
  createUser: (
    createUserDto: CreateUserDto,
  ) => Promise<ResponseApi<UserEntity>>;
  findAllUsers: () => Promise<ResponseApi<UserEntity[]>>;
  findUserById: (id: string) => Promise<ResponseApi<UserEntity>>;
  removeUser: (id: string) => Promise<ResponseApi<DeleteResult>>;
}
