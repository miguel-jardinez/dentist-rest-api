import { PatientPersonalFormEntity } from '../entities/patient-personal-form.entity';
import { CreatePatientPersonalFormDto } from '../dto/personal-form/create-patient-personal-form.dto';
import { PatientRelativesFormEntity } from '../entities/patient-relatives-form.entity';
import { CreatePatientRelativesFormDto } from '../dto/relatives-form/create-patient-relatives-form.dto';
import { UpdatePatientPersonalFormDto } from '../dto/personal-form/update-patient-personal-form.dto';
import { UpdatePatientRelativesFormDto } from '../dto/relatives-form/update-patient-relatives-form.dto';

export interface InterfaceFormService {
  createPersonalForm: (
    userId: string,
    createPersonalForm: CreatePatientPersonalFormDto,
  ) => Promise<PatientPersonalFormEntity>;

  createRelativesForm: (
    userId: string,
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
