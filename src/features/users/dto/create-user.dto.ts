import { IsEnum, IsString, Length } from 'class-validator';
import { CreateUserDtoInterface } from '@features/users/dto/types/createUserDtoInterface';
import { UserRole } from '@utils/RoleEnum';

export class CreateUserDto implements CreateUserDtoInterface {
  @IsString()
  email: string;

  @IsString()
  @Length(0, 100)
  password: string;

  @IsString()
  @IsEnum(UserRole, { each: true })
  role: UserRole;
}
