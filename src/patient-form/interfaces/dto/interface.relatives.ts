import { RelativesEnum } from '../../types/relativesEnum';

export interface RelativeFormInterface {
  id?: string;
  relative_has_cancer: boolean;
  relative_with_cancer: RelativesEnum[];
  relative_has_diabetes: boolean;
  relative_with_diabetes: RelativesEnum[];
  relative_has_heart_disease: boolean;
  relative_with_hearth_disease: RelativesEnum[];
  relative_has_asthma: boolean;
  relative_with_asthma: RelativesEnum[];
  create_date_time?: Date;
  last_changed_date_time?: Date;
}
