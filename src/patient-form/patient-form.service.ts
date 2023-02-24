import { Injectable } from '@nestjs/common';
import { CreatePatientPersonalFormDto } from './dto/personal-form/create-patient-personal-form.dto';
import { UpdatePatientPersonalFormDto } from './dto/personal-form/update-patient-personal-form.dto';
import { CreatePatientRelativesFormDto } from './dto/relatives-form/create-patient-relatives-form.dto';
import { UpdatePatientRelativesFormDto } from './dto/relatives-form/update-patient-relatives-form.dto';

@Injectable()
export class PatientFormService {
  createPersonalForm(
    createPatientFormDto: CreatePatientPersonalFormDto,
    userId: string,
  ) {
    return 'This action adds a new patientForm';
  }

  createRelativesForm(
    createRelativesformDto: CreatePatientRelativesFormDto,
    userId: string,
  ) {
    return 'This action adds a new patientForm';
  }

  findAll() {
    return `This action returns all patientForm`;
  }

  findOnePersonalForm(id: string) {
    return `This action returns a #${id} patientForm`;
  }

  findOneRelativesForm(id: string) {
    return `This action returns a #${id} patientForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientForm`;
  }

  updatePersonalForm(
    formId: string,
    personalForm: UpdatePatientPersonalFormDto,
    userId: string,
  ) {
    return `This action update personal form ${formId} with user ${userId}`;
  }

  updateRelativeForm(
    formId: string,
    relativesForm: UpdatePatientRelativesFormDto,
    userId: string,
  ) {
    return `This action update relatives form ${formId} with user ${userId}`;
  }
}
