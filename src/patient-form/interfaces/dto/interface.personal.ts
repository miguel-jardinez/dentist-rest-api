import { ProfileEntity } from '../../../profile/entities/profile.entity';

export interface PersonalFormInterface {
  id?: string;
  has_cancer: boolean;
  cancer_comments?: string;
  has_diabetes: boolean;
  diabetes_comments?: string;
  has_heart_disease: boolean;
  heart_disease_comments?: string;
  has_kidney_diseases: boolean;
  kidney_diseases_comments?: string;
  has_respiratory_diseases: boolean;
  respiratory_diseases_comments?: string;
  has_liver_diseases: boolean;
  liver_diseases_comments?: string;
  has_bone_or_joint_problems: boolean;
  bone_or_joint_problems_comments?: string;
  has_autoimmune_diseases: boolean;
  autoimmune_diseases_comments?: string;
  has_pregnant: boolean;
  pregnant_comments?: string;
  has_ever_used_drugs: boolean;
  used_drugs_comments?: string;
  has_gastrointestinal_disorders: boolean;
  gastrointestinal_disorders_comments?: string;
  has_endocrine_diseases: boolean;
  endocrine_diseases_comments?: string;
  profile?: ProfileEntity;
  create_date_time?: Date;
  last_changed_date_time?: Date;
}
