import { RelativeFormInterface } from '../../interfaces/dto/interface.relatives';
import { RelativesEnum } from '../../types/relativesEnum';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class CreatePatientRelativesFormDto implements RelativeFormInterface {
  @IsBoolean()
  relative_has_asthma: boolean;

  @IsBoolean()
  relative_has_cancer: boolean;

  @IsBoolean()
  relative_has_diabetes: boolean;

  @IsBoolean()
  relative_has_heart_disease: boolean;

  @IsEnum(RelativesEnum)
  @IsOptional()
  relative_with_asthma: RelativesEnum[];

  @IsEnum(RelativesEnum)
  @IsOptional()
  relative_with_cancer: RelativesEnum[];

  @IsEnum(RelativesEnum)
  @IsOptional()
  relative_with_diabetes: RelativesEnum[];

  @IsEnum(RelativesEnum)
  @IsOptional()
  relative_with_hearth_disease: RelativesEnum[];
}
