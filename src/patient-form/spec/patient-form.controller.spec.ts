import { Test, TestingModule } from '@nestjs/testing';
import { PatientFormController } from '../patient-form.controller';
import { PatientFormService } from '../patient-form.service';
import { createMock } from '@golevelup/ts-jest';
import { Usertype } from '../../utils/types/User';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../utils/RoleEnum';
import { CreatePatientPersonalFormDto } from '../dto/personal-form/create-patient-personal-form.dto';
import { CreatePatientRelativesFormDto } from '../dto/relatives-form/create-patient-relatives-form.dto';
import { UpdatePatientPersonalFormDto } from '../dto/personal-form/update-patient-personal-form.dto';
import { UpdatePatientRelativesFormDto } from '../dto/relatives-form/update-patient-relatives-form.dto';
import { RelativesEnum } from '../types/relativesEnum';
import { PatientPersonalFormEntity } from '../entities/patient-personal-form.entity';
import { PatientRelativesFormEntity } from '../entities/patient-relatives-form.entity';

describe('PatientFormController', () => {
  let controller: PatientFormController;
  let service: PatientFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientFormController],
      providers: [
        {
          provide: PatientFormService,
          useValue: createMock<PatientFormService>(),
        },
      ],
    }).compile();

    controller = module.get<PatientFormController>(PatientFormController);
    service = module.get<PatientFormService>(PatientFormService);
  });

  describe('DEFINED', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('CONTROLLER', () => {
    let req: { user: Usertype };
    let createPersonalForm: CreatePatientPersonalFormDto;
    let createRelativeForm: CreatePatientRelativesFormDto;
    let updatePersonalForm: UpdatePatientPersonalFormDto;
    let updateRelativeForm: UpdatePatientRelativesFormDto;

    let personalFormEntity: PatientPersonalFormEntity;
    let relativesFormEntity: PatientRelativesFormEntity;

    beforeEach(() => {
      req = {
        user: {
          id: faker.datatype.uuid(),
          role: UserRole.PATIENT,
        },
      };

      personalFormEntity = {
        has_autoimmune_diseases: false,
        has_bone_or_joint_problems: false,
        has_cancer: false,
        has_diabetes: false,
        has_endocrine_diseases: false,
        has_ever_used_drugs: false,
        has_gastrointestinal_disorders: false,
        has_heart_disease: false,
        has_kidney_diseases: false,
        has_liver_diseases: false,
        has_pregnant: false,
        has_respiratory_diseases: false,
        id: faker.datatype.uuid(),
      };

      relativesFormEntity = {
        create_date_time: undefined,
        id: faker.datatype.uuid(),
        last_changed_date_time: undefined,
        profile: undefined,
        relative_has_asthma: false,
        relative_has_cancer: false,
        relative_has_diabetes: false,
        relative_has_heart_disease: false,
        relatives_has_respiratory_diseases: false,
      };

      createPersonalForm = {
        has_autoimmune_diseases: false,
        has_bone_or_joint_problems: false,
        has_cancer: false,
        has_diabetes: false,
        has_endocrine_diseases: false,
        has_ever_used_drugs: false,
        has_gastrointestinal_disorders: false,
        has_heart_disease: false,
        has_kidney_diseases: false,
        has_liver_diseases: false,
        has_pregnant: false,
        has_respiratory_diseases: false,
      };

      createRelativeForm = {
        relative_has_asthma: false,
        relative_has_cancer: false,
        relative_has_diabetes: false,
        relative_has_heart_disease: false,
        relatives_additional_comments: '',
        relatives_has_respiratory_diseases: false,
      };

      updatePersonalForm = {
        ...createPersonalForm,
        has_heart_disease: true,
        heart_disease_comments: 'I have heart disease',
      };

      updateRelativeForm = {
        ...createRelativeForm,
        relative_has_asthma: true,
        relative_with_cancer: [RelativesEnum.FATHER, RelativesEnum.MOTHER],
      };
    });

    describe('RELATIVES FORM', () => {
      describe('createRelativeForm', () => {
        it('should return relative form entity when form was created', async () => {
          // CONFIGURATION
          const spyCreateRelativeForm = jest
            .spyOn(service, 'createRelativesForm')
            .mockResolvedValue(relativesFormEntity);

          // CALL FUNCTIONS
          const response = await controller.createRelativeForm(
            createRelativeForm,
            req,
          );

          // TESTING
          expect(spyCreateRelativeForm).toBeCalledWith(
            req.user,
            createRelativeForm,
          );
          expect(response).toEqual(relativesFormEntity);
        });
      });
      describe('findOneRelativesForm', () => {
        it('should return relative form entity when form was created', async () => {
          // CONFIGURATION
          const fakerId = faker.datatype.uuid();
          const spyFindOneRelativeForm = jest
            .spyOn(service, 'findOneRelativesForm')
            .mockResolvedValue(relativesFormEntity);

          // CALL FUNCTIONS
          const response = await controller.findOneRelativesForm(fakerId, req);

          // TESTING
          expect(spyFindOneRelativeForm).toBeCalledWith(req.user.id, fakerId);
          expect(response).toEqual(relativesFormEntity);
        });
      });
      describe('updateRelativesForm', () => {
        it('should return relative form entity when form was created', async () => {
          // CONFIGURATION
          const fakerId = faker.datatype.uuid();
          const mockMessage = `User ${fakerId} has been updated`;
          const spyUpdateRelativeForm = jest
            .spyOn(service, 'updateRelativeForm')
            .mockResolvedValue(mockMessage);

          // CALL FUNCTIONS
          const response = await controller.updateRelativesForm(
            fakerId,
            updateRelativeForm,
            req,
          );

          // TESTING
          expect(spyUpdateRelativeForm).toBeCalledWith(
            req.user.id,
            fakerId,
            updateRelativeForm,
          );
          expect(response).toEqual(mockMessage);
        });
      });
    });

    describe('PERSONAL FORM', () => {
      describe('createPersonalForm', () => {
        it('should return personal form entity when form was created', async () => {
          // CONFIGURATION
          const spyCreatePersonalForm = jest
            .spyOn(service, 'createPersonalForm')
            .mockResolvedValue(personalFormEntity);

          // CALL FUNCTIONS
          const response = await controller.createPersonalForm(
            createPersonalForm,
            req,
          );

          // TESTING
          expect(spyCreatePersonalForm).toBeCalledWith(
            req.user,
            createPersonalForm,
          );
          expect(response).toEqual(personalFormEntity);
        });
      });
      describe('findOnePersonalForm', () => {
        it('should return personal form entity when form was created', async () => {
          // CONFIGURATION
          const fakerId = faker.datatype.uuid();
          const spyFindOnePersonalForm = jest
            .spyOn(service, 'findOnePersonalForm')
            .mockResolvedValue(personalFormEntity);

          // CALL FUNCTIONS
          const response = await controller.findOnePersonalForm(fakerId, req);

          // TESTING
          expect(spyFindOnePersonalForm).toBeCalledWith(req.user.id, fakerId);
          expect(response).toEqual(personalFormEntity);
        });
      });
      describe('updatePersonalForm', () => {
        it('should return personal form entity when form was created', async () => {
          // CONFIGURATION
          const fakerId = faker.datatype.uuid();
          const fakerMessage = `Form ${fakerId} has been updated`;
          const spyUpdatePersonalForm = jest
            .spyOn(service, 'updatePersonalForm')
            .mockResolvedValue(fakerMessage);

          // CALL FUNCTIONS
          const response = await controller.updatePersonalForm(
            fakerId,
            updatePersonalForm,
            req,
          );

          // TESTING
          expect(spyUpdatePersonalForm).toBeCalledWith(
            req.user.id,
            fakerId,
            updatePersonalForm,
          );
          expect(response).toEqual(fakerMessage);
        });
      });
    });
  });
});
