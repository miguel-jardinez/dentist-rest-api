import { ProfileEntity } from '../../../profile/entities/profile.entity';

export interface PersonalFormInterface {
  id?: string;
  has_cancer: boolean;
  has_diabetes: boolean;
  has_heart_disease: boolean;
  has_asthma: boolean;
  profile?: ProfileEntity;
  create_date_time?: Date;
  last_changed_date_time?: Date;
}
