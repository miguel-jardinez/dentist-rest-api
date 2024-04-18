import { IsEnum, IsString, Length } from 'class-validator';
import { CreateUserDtoInterface } from '@features/users/dto/types/createUserDtoInterface';
import { UserRole } from '@utils/RoleEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements CreateUserDtoInterface {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(0, 100)
  password: string;

  @ApiProperty({ enum: UserRole, required: true, enumName: 'User Roles' })
  @IsString()
  @IsEnum(UserRole, { each: true })
  role: UserRole;
}
