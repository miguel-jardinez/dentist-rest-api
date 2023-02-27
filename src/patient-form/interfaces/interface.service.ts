import { PatientPersonalFormEntity } from '../entities/patient-personal-form.entity';
import { CreatePatientPersonalFormDto } from '../dto/personal-form/create-patient-personal-form.dto';
import { PatientRelativesFormEntity } from '../entities/patient-relatives-form.entity';
import { CreatePatientRelativesFormDto } from '../dto/relatives-form/create-patient-relatives-form.dto';
import { UpdatePatientPersonalFormDto } from '../dto/personal-form/update-patient-personal-form.dto';
import { UpdatePatientRelativesFormDto } from '../dto/relatives-form/update-patient-relatives-form.dto';
import { UserRole } from '../../utils/RoleEnum';

export type Usertype = { id: string; role: UserRole };

export interface InterfaceFormService {
  createPersonalForm: (
    user: Usertype,
    createPersonalForm: CreatePatientPersonalFormDto,
  ) => Promise<PatientPersonalFormEntity>;

  createRelativesForm: (
    user: Usertype,
    createRelativeForm: CreatePatientRelativesFormDto,
  ) => Promise<PatientRelativesFormEntity>;

  findOnePersonalForm: (
    userId: string,
    formId: string,
  ) => Promise<PatientPersonalFormEntity>;

  findOneRelativesForm: (
    userId: string,
    formId: string,
  ) => Promise<PatientRelativesFormEntity>;

  updatePersonalForm: (
    userId: string,
    formId: string,
    updateForm: UpdatePatientPersonalFormDto,
  ) => Promise<string>;

  updateRelativeForm: (
    userId: string,
    formId: string,
    updateForm: UpdatePatientRelativesFormDto,
  ) => Promise<string>;
}
