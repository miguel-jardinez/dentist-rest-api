import { RelativesEnum } from '../../types/relativesEnum';

export interface RelativeFormInterface {
  id?: string;
  relative_has_cancer: boolean;
  relative_with_cancer?: RelativesEnum[];
  relative_has_diabetes: boolean;
  relative_with_diabetes?: RelativesEnum[];
  relative_has_heart_disease: boolean;
  relative_with_hearth_disease?: RelativesEnum[];
  relatives_has_respiratory_diseases: boolean;
  relative_with_respiratory_diseases?: RelativesEnum[];
  relatives_additional_comments?: string;
  create_date_time?: Date;
  last_changed_date_time?: Date;
}
