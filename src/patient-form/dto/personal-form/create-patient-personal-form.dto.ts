import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PersonalFormInterface } from '../../interfaces/dto/interface.personal';

export class CreatePatientPersonalFormDto implements PersonalFormInterface {
  @IsString()
  @IsOptional()
  autoimmune_diseases_comments?: string;

  @IsString()
  @IsOptional()
  bone_or_joint_problems_comments?: string;

  @IsString()
  @IsOptional()
  cancer_comments?: string;

  @IsString()
  @IsOptional()
  diabetes_comments?: string;

  @IsString()
  @IsOptional()
  endocrine_diseases_comments?: string;

  @IsString()
  @IsOptional()
  gastrointestinal_disorders_comments?: string;

  @IsBoolean()
  @IsNotEmpty()
  has_autoimmune_diseases: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_bone_or_joint_problems: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_cancer: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_diabetes: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_endocrine_diseases: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_ever_used_drugs: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_gastrointestinal_disorders: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_heart_disease: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_kidney_diseases: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_liver_diseases: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_pregnant: boolean;

  @IsBoolean()
  @IsNotEmpty()
  has_respiratory_diseases: boolean;

  @IsString()
  @IsOptional()
  heart_disease_comments?: string;

  @IsString()
  @IsOptional()
  kidney_diseases_comments?: string;

  @IsString()
  @IsOptional()
  liver_diseases_comments?: string;

  @IsString()
  @IsOptional()
  pregnant_comments?: string;

  @IsString()
  @IsOptional()
  respiratory_diseases_comments?: string;

  @IsString()
  @IsOptional()
  used_drugs_comments?: string;
}
