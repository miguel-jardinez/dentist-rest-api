import { IsEmail, IsString, Matches } from 'class-validator';
import { PasswordValidator } from '@utils/validators/validators';

export class AwsLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(PasswordValidator, { message: 'Password no matches' })
  password: string;
}
