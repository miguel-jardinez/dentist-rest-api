import { IsBoolean } from 'class-validator';
import { PersonalFormInterface } from '../../interfaces/dto/interface.personal';

export class CreatePatientPersonalFormDto implements PersonalFormInterface {
  @IsBoolean()
  has_asthma: boolean;

  @IsBoolean()
  has_cancer: boolean;

  @IsBoolean()
  has_diabetes: boolean;

  @IsBoolean()
  has_heart_disease: boolean;
}
