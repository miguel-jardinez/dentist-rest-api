import { CreateAmountDto } from '../amount/create-amount.dto';
import { IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDentistServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => CreateAmountDto)
  amount: CreateAmountDto;
}
