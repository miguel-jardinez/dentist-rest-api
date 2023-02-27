import { ProfileInterface } from '../interface/Profile.interface';
import { IsString } from 'class-validator';

export class CreateProfileDto implements ProfileInterface {
  @IsString()
  name: string;

  @IsString()
  father_last_name: string;

  @IsString()
  mother_last_name: string;

  @IsString()
  phone_number: string;
}
