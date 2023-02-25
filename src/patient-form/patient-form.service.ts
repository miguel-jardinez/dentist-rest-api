import { Injectable, Logger } from '@nestjs/common';
import { CreatePatientPersonalFormDto } from './dto/personal-form/create-patient-personal-form.dto';
import { UpdatePatientPersonalFormDto } from './dto/personal-form/update-patient-personal-form.dto';
import { CreatePatientRelativesFormDto } from './dto/relatives-form/create-patient-relatives-form.dto';
import { UpdatePatientRelativesFormDto } from './dto/relatives-form/update-patient-relatives-form.dto';
import { InterfaceFormService } from './interfaces/interface.service';
import { PatientRelativesFormEntity } from './entities/patient-relatives-form.entity';
import { PatientPersonalFormEntity } from './entities/patient-personal-form.entity';
import { ErrorService } from '../utils/ErrorService';
import { ProfileService } from '../profile/profile.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientFormService implements InterfaceFormService {
  private readonly logger = new Logger(PatientFormService.name);
  constructor(
    @InjectRepository(PatientPersonalFormEntity)
    private readonly personalFormEntity: Repository<PatientPersonalFormEntity>,
    @InjectRepository(PatientRelativesFormEntity)
    private readonly relativeFormEntity: Repository<PatientRelativesFormEntity>,
    private readonly errorService: ErrorService,
    private readonly profileService: ProfileService,
  ) {}
  public async createPersonalForm(
    userId: string,
    createPersonalForm: CreatePatientPersonalFormDto,
  ): Promise<PatientPersonalFormEntity> {
    try {
      const profile = await this.profileService.findByUserId(userId);
      const personalForm = this.personalFormEntity.create(createPersonalForm);
      const data = await this.personalFormEntity.save({
        ...personalForm,
        profile: { id: profile.id },
      });

      this.logger.log(
        `Personal form data was created user_id: ${userId} form_id: ${data.id}`,
      );

      return data;
    } catch (e) {
      this.logger.error(`Personal form was not created to user_id: ${userId}`);
      this.errorService.errorHandling('404', e.message);
    }
  }

  public async createRelativesForm(
    userId: string,
    createRelativeForm: CreatePatientRelativesFormDto,
  ): Promise<PatientRelativesFormEntity> {
    try {
      const profile = await this.profileService.findByUserId(userId);
      const relativeForm = this.relativeFormEntity.create(createRelativeForm);
      const data = await this.relativeFormEntity.save({
        ...relativeForm,
        profile: { id: profile.id },
      });

      this.logger.log(
        `Relatives form data was created user_id: ${userId} form_id: ${data.id}`,
      );

      return data;
    } catch (e) {
      this.logger.error(`Relatives form was not created to user_id: ${userId}`);
      this.errorService.errorHandling('404', e.message);
    }
  }

  public async findOnePersonalForm(
    userId: string,
    formId: string,
  ): Promise<PatientPersonalFormEntity> {
    try {
      const data = await this.personalFormEntity.findOneOrFail({
        where: { id: formId, profile: { user: { id: userId } } },
      });

      this.logger.log(
        `Personal form data was found user_id: ${userId} form_id: ${data.id}`,
      );

      return data;
    } catch (e) {
      this.logger.error(`Relatives form was not found to user_id: ${userId}`);
      this.errorService.errorHandling('404', e.message);
    }
  }

  public async findOneRelativesForm(
    userId: string,
    formId: string,
  ): Promise<PatientRelativesFormEntity> {
    try {
      const data = await this.relativeFormEntity.findOneOrFail({
        where: { id: formId, profile: { user: { id: userId } } },
      });

      this.logger.log(
        `Relatives form data was found user_id: ${userId} form_id: ${data.id}`,
      );

      return data;
    } catch (e) {
      this.logger.error(`Relatives form was not found to user_id: ${userId}`);
      this.errorService.errorHandling('404', e.message);
    }
  }

  public async updatePersonalForm(
    userId: string,
    formId: string,
    updateForm: UpdatePatientPersonalFormDto,
  ): Promise<string> {
    try {
      const data = await this.personalFormEntity.update(
        { id: formId, profile: { user: { id: userId } } },
        updateForm,
      );

      if (data.affected === 0) {
        this.logger.error(
          `Personal form was not updated form_id: ${formId} to user_id: ${userId}`,
        );
        this.errorService.errorHandling(
          '404',
          `form_id: ${formId} was not found`,
        );
      }

      this.logger.log(
        `Personal form data was updated user_id: ${userId} form_id: ${formId}`,
      );
      return `Personal form data was updated user_id: ${userId} form_id: ${formId}`;
    } catch (e) {
      this.logger.error(
        `Personal form was not updated form_id: ${formId} to user_id: ${userId}`,
      );
      this.errorService.errorHandling('404', e.mssage);
    }
  }

  public async updateRelativeForm(
    userId: string,
    formId: string,
    updateForm: UpdatePatientRelativesFormDto,
  ): Promise<string> {
    try {
      const data = await this.relativeFormEntity.update(
        { id: formId, profile: { user: { id: userId } } },
        updateForm,
      );

      if (data.affected === 0) {
        this.logger.error(
          `Relatives form was not updated form_id: ${formId} to user_id: ${userId}`,
        );
        this.errorService.errorHandling(
          '404',
          `form_id: ${formId} was not found`,
        );
      }

      this.logger.log(
        `Relative form data was updated user_id: ${userId} form_id: ${formId}`,
      );
      return `Relative form data was updated user_id: ${userId} form_id: ${formId}`;
    } catch (e) {
      this.logger.error(
        `Relatives form was not updated form_id: ${formId} to user_id: ${userId}`,
      );
      this.errorService.errorHandling('404', e.mssage);
    }
  }
}
