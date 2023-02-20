import { ProfileInterface } from '../interface/Profile.interface';
import { IsString } from 'class-validator';

export class CreateProfileDto implements ProfileInterface {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone_number: string;
}
