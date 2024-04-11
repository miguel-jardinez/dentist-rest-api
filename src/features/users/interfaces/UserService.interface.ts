import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { DeleteResult } from 'typeorm';

export interface UserServiceInterface {
  create: (createUserDto: CreateUserDto) => Promise<ResponseApi<UserEntity>>;
  findAll: () => Promise<ResponseApi<UserEntity[]>>;
  findById: (id: string) => Promise<ResponseApi<UserEntity>>;
  remove: (id: string) => Promise<ResponseApi<DeleteResult>>;
  findByEmail: (email: string) => Promise<ResponseApi<UserEntity>>;
}
