import { IsEnum, IsString, Length } from 'class-validator';
import { UserModel } from '../types/UserModel';
import { UserRole } from '../../utils/RoleEnum';

export class CreateUserDto implements UserModel {
  @IsString()
  email: string;

  @IsString()
  @Length(0, 100)
  password: string;

  @IsString()
  username: string;

  @IsString()
  @IsEnum(UserRole, { each: true })
  role: UserRole;
}
