import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export interface UserServiceInterface {
  create: (createUserDto: CreateUserDto) => Promise<UserEntity>;
  findAll: () => Promise<UserEntity[]>;
  findById: (id: string) => Promise<UserEntity>;
  remove: (id: string) => Promise<string | void>;
  findByEmail: (email: string) => Promise<UserEntity>;
}
