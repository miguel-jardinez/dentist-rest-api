import { PatientPersonalFormEntity } from '../entities/patient-personal-form.entity';
import { PatientRelativesFormEntity } from '../entities/patient-relatives-form.entity';
import { CreatePatientPersonalFormDto } from '../dto/personal-form/create-patient-personal-form.dto';
import { CreatePatientRelativesFormDto } from '../dto/relatives-form/create-patient-relatives-form.dto';
import { Request } from 'express';
import { UpdatePatientPersonalFormDto } from '../dto/personal-form/update-patient-personal-form.dto';
import { UpdatePatientRelativesFormDto } from '../dto/relatives-form/update-patient-relatives-form.dto';

export interface InterfaceController {
  createPersonalForm: (
    createPersonalForm: CreatePatientPersonalFormDto,
    request: Request,
  ) => Promise<PatientPersonalFormEntity>;

  createRelativeForm: (
    createRelativeForm: CreatePatientRelativesFormDto,
    request: Request,
  ) => Promise<PatientRelativesFormEntity>;

  findOnePersonalForm: (
    formId: string,
    userId: string,
  ) => Promise<PatientPersonalFormEntity>;

  findOneRelativesForm: (
    formId: string,
    userId: string,
  ) => Promise<PatientRelativesFormEntity>;

  updatePersonalForm: (
    formId: string,
    updateForm: UpdatePatientPersonalFormDto,
    req: Request,
  ) => Promise<string>;

  updateRelativesForm: (
    formId: string,
    updateForm: UpdatePatientRelativesFormDto,
    req: Request,
  ) => Promise<string>;
}
