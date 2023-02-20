import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { CurrencyEnum } from '../../types/currencyEnum';

export class CreateAmountDto {
  @IsNotEmpty()
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total: number;
}
