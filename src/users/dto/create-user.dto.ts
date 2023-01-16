import { IsString, Length } from 'class-validator';
import { UserModel } from '../types/UserModel';

export class CreateUserDto implements UserModel {
  @IsString()
  email: string;

  @IsString()
  @Length(0, 100)
  password: string;

  @IsString()
  username: string;
}
