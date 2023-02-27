import { CreateAmountDto } from '../amount/create-amount.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDentistServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  is_visible: boolean;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => CreateAmountDto)
  amount: CreateAmountDto;
}
