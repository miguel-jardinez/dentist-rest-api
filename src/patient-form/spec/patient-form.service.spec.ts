import { Test, TestingModule } from '@nestjs/testing';
import { PatientFormService } from '../patient-form.service';
import { ProfileService } from '../../profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientPersonalFormEntity } from '../entities/patient-personal-form.entity';
import { PatientRelativesFormEntity } from '../entities/patient-relatives-form.entity';
import { ErrorService } from '../../utils/ErrorService';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { Usertype } from '../../utils/types/User';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../utils/RoleEnum';
import { CreatePatientPersonalFormDto } from '../dto/personal-form/create-patient-personal-form.dto';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { CreatePatientRelativesFormDto } from '../dto/relatives-form/create-patient-relatives-form.dto';
import { UpdatePatientPersonalFormDto } from '../dto/personal-form/update-patient-personal-form.dto';
import { UpdatePatientRelativesFormDto } from '../dto/relatives-form/update-patient-relatives-form.dto';

const profileMock: ProfileEntity = {
  create_date_time: faker.date.past(),
  father_last_name: faker.name.lastName(),
  id: faker.datatype.uuid(),
  last_changed_date_time: faker.date.recent(),
  mother_last_name: faker.name.lastName(),
  name: faker.name.fullName(),
  user: null,
};

describe('PatientFormService', () => {
  let service: PatientFormService;
  let personalRepo: Repository<PatientPersonalFormEntity>;
  let relativeRepo: Repository<PatientRelativesFormEntity>;
  let profileService: ProfileService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientFormService,
        {
          provide: ProfileService,
          useValue: createMock<ProfileService>(),
        },
        {
          provide: Logger,
          useValue: createMock<Logger>(),
        },
        {
          provide: ProfileService,
          useValue: createMock<ProfileService>(),
        },
        {
          provide: getRepositoryToken(PatientPersonalFormEntity),
          useValue: createMock<PatientPersonalFormEntity>(),
        },
        {
          provide: getRepositoryToken(PatientRelativesFormEntity),
          useValue: createMock<PatientPersonalFormEntity>(),
        },
        ErrorService,
      ],
    }).compile();

    personalRepo = module.get<Repository<PatientPersonalFormEntity>>(
      getRepositoryToken(PatientPersonalFormEntity),
    );
    relativeRepo = module.get<Repository<PatientRelativesFormEntity>>(
      getRepositoryToken(PatientRelativesFormEntity),
    );
    service = module.get<PatientFormService>(PatientFormService);
    profileService = module.get<ProfileService>(ProfileService);
    logger = module.get<Logger>(Logger);
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(personalRepo).toBeDefined();
      expect(relativeRepo).toBeDefined();
      expect(logger).toBeDefined();
      expect(profileService).toBeDefined();
    });
  });

  describe('Personal Forms', () => {
    let createDto: CreatePatientPersonalFormDto;
    let updateDto: UpdatePatientPersonalFormDto;
    let formId: string;
    let user: Usertype;

    beforeEach(() => {
      formId = faker.datatype.uuid();

      createDto = {
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

      user = {
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      updateDto = {
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
    });

    describe('CREATE', () => {
      it('should return PatientPersonalFormEntity when repository save correctly', async () => {
        // CONFIGURATION
        const personalFormEntity: PatientPersonalFormEntity = {
          ...createDto,
          create_date_time: faker.date.past(),
          id: formId,
          last_changed_date_time: faker.date.recent(),
        };

        // CALL FUNCTIONS
        const findUserSpy = jest
          .spyOn(profileService, 'findByUserId')
          .mockResolvedValue(profileMock);

        const createForm = jest
          .spyOn(personalRepo, 'create')
          .mockReturnValue(personalFormEntity);

        const saveForm = jest
          .spyOn(personalRepo, 'save')
          .mockResolvedValue(personalFormEntity);

        const data = await service.createPersonalForm(user, createDto);

        // TESTING
        expect(data).toEqual(personalFormEntity);
        expect(findUserSpy).toHaveBeenCalledWith(user);
        expect(createForm).toHaveBeenCalledWith(createDto);
        expect(saveForm).toHaveBeenCalledWith({
          ...personalFormEntity,
          profile: { id: profileMock.id },
        });
      });

      it('should return http exception when repository save service fails', async () => {
        // CONFIGURATION
        const personalFormEntity: PatientPersonalFormEntity = {
          ...createDto,
          create_date_time: faker.date.past(),
          id: formId,
          last_changed_date_time: faker.date.recent(),
        };
        const message = `Personal address ${personalFormEntity.id} already exist`;

        // CALL FUNCTION
        jest.spyOn(personalRepo, 'create').mockReturnValue(personalFormEntity);
        jest
          .spyOn(personalRepo, 'save')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '23505', message }),
          );

        // TESTING
        await expect(
          service.createPersonalForm(user, createDto),
        ).rejects.toThrow(new HttpException(message, HttpStatus.CONFLICT));
      });
    });

    describe('FIND ONE', () => {
      it('should return one personal form when user pass correct id', async () => {
        // CONFIGURATION
        const mockPersonalForm: PatientPersonalFormEntity = {
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
          id: formId,
          last_changed_date_time: faker.date.recent(),
          create_date_time: faker.date.past(),
        };

        // CALL FUNCTIONS
        const findOneSpy = jest
          .spyOn(personalRepo, 'findOneOrFail')
          .mockResolvedValue(mockPersonalForm);

        const data = await service.findOnePersonalForm(user.id, formId);

        // TESTING
        expect(data).toEqual(mockPersonalForm);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: formId, profile: { user: { id: user.id } } },
        });
      });

      it('should return http exception if not found personal form', async () => {
        // CONFIGURATION
        const message = `Form id ${formId} not found to user ${user.id}`;

        // CALL FUNCTION
        jest
          .spyOn(personalRepo, 'findOneOrFail')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '404', message }),
          );

        // TESTING
        await expect(
          service.findOnePersonalForm(user.id, formId),
        ).rejects.toThrow(
          new HttpException(
            `user ${message} do not exists`,
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });

    describe('UPDATE', () => {
      it('should return success message when form was updated', async () => {
        // CONFIGURATION
        const successMessage = `Personal form data was updated user_id: ${user.id} form_id: ${formId}`;

        // CALL FUNCTIONS
        const updateSpy = jest.spyOn(personalRepo, 'update').mockResolvedValue({
          affected: 1,
          raw: [],
          generatedMaps: [],
        });

        const data = await service.updatePersonalForm(
          user.id,
          formId,
          updateDto,
        );

        // TESTING
        expect(updateSpy).toHaveBeenCalledWith(
          { id: formId, profile: { user: { id: user.id } } },
          updateDto,
        );
        expect(data).toEqual(successMessage);
      });

      it('should return http exception when affected response will be 0', async () => {
        // CONFIGURATION
        // CALL FUNCTION
        jest.spyOn(personalRepo, 'update').mockResolvedValue({
          affected: 0,
          raw: [],
          generatedMaps: [],
        });

        // TESTING
        await expect(
          service.updatePersonalForm(user.id, formId, updateDto),
        ).rejects.toThrow(
          new HttpException(
            `user user form_id: ${formId} was not found do not exists do not exists`,
            HttpStatus.NOT_FOUND,
          ),
        );
      });

      it('should return http exception when update service fails', async () => {
        // CONFIGURATION
        const message = `form_id ${formId} not found to update`;
        // CALL FUNCTION
        jest
          .spyOn(personalRepo, 'update')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '404', message }),
          );
        // TESTING
        await expect(
          service.updatePersonalForm(user.id, formId, updateDto),
        ).rejects.toThrow(
          new HttpException(
            `user ${message} do not exists`,
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });
  });

  describe('Relative Form', () => {
    let createRelativeDto: CreatePatientRelativesFormDto;
    let updateDto: UpdatePatientRelativesFormDto;
    let user: Usertype;
    let formId: string;

    beforeEach(() => {
      formId = faker.datatype.uuid();

      createRelativeDto = {
        relative_has_asthma: false,
        relative_has_cancer: false,
        relative_has_diabetes: false,
        relative_has_heart_disease: false,
        relatives_additional_comments: faker.lorem.text(),
        relatives_has_respiratory_diseases: false,
      };

      updateDto = {
        relative_has_asthma: false,
        relative_has_cancer: false,
        relative_has_diabetes: false,
        relative_has_heart_disease: false,
        relatives_additional_comments: faker.lorem.text(),
        relatives_has_respiratory_diseases: false,
      };

      user = {
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };
    });

    describe('CREATE', () => {
      it('should return Relatives Form Entity when services save information', async () => {
        // CONFIGURATION
        const mockFormEntity: PatientRelativesFormEntity = {
          ...createRelativeDto,
          id: faker.datatype.uuid(),
          last_changed_date_time: faker.date.recent(),
          create_date_time: faker.date.past(),
          profile: profileMock,
        };

        // CALL FUNCTION
        const profileSpy = jest
          .spyOn(profileService, 'findByUserId')
          .mockResolvedValue(profileMock);
        const createSpy = jest
          .spyOn(relativeRepo, 'create')
          .mockReturnValue(mockFormEntity);
        const saveSpy = jest
          .spyOn(relativeRepo, 'save')
          .mockResolvedValue(mockFormEntity);
        const data = await service.createRelativesForm(user, createRelativeDto);

        // TESTING
        expect(data).toEqual(mockFormEntity);
        expect(profileSpy).toHaveBeenCalledWith(user);
        expect(saveSpy).toHaveBeenCalledWith({
          ...mockFormEntity,
          profile: { id: profileMock.id },
        });
        expect(createSpy).toHaveBeenCalledWith(createRelativeDto);
      });

      it('should return http exception when some service fails or is unauthorized in form creation', async () => {
        // CONFIGURATION
        const userUnauthorized: Usertype = {
          id: faker.datatype.uuid(),
          role: UserRole.DENTIST,
        };

        const message = `User ${userUnauthorized.id} role: ${userUnauthorized.role} does not have authorization for this service`;

        // CALL FUNCTION
        jest
          .spyOn(profileService, 'findByUserId')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '401', message }),
          );

        // TESTING
        await expect(
          service.createRelativesForm(user, createRelativeDto),
        ).rejects.toThrow(new HttpException(message, HttpStatus.UNAUTHORIZED));
      });
    });

    describe('FIND ONE', () => {
      it('should return patient relative form when id will be correct', async () => {
        // CONFIGURATION
        const mockRelativeEntity: PatientRelativesFormEntity = {
          ...createRelativeDto,
          last_changed_date_time: faker.date.recent(),
          create_date_time: faker.date.past(),
          id: faker.datatype.uuid(),
          profile: profileMock,
        };

        // CALL FUNCTIONS
        const findOneSpy = jest
          .spyOn(relativeRepo, 'findOneOrFail')
          .mockResolvedValue(mockRelativeEntity);

        const data = await service.findOneRelativesForm(user.id, formId);

        // TESTING
        expect(data).toEqual(mockRelativeEntity);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: formId, profile: { user: { id: user.id } } },
        });
      });

      it('should return http exception when find service fails', async () => {
        // CONFIGURATION
        const message = `Form_id ${formId} not found`;

        // CALL FUNCTIONS
        jest
          .spyOn(relativeRepo, 'findOneOrFail')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '404', message }),
          );

        // TESTING
        await expect(
          service.findOneRelativesForm(user.id, formId),
        ).rejects.toThrow(
          new HttpException(
            `user ${message} do not exists`,
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });

    describe('UPDATE', () => {
      it('should return success message when form was updated', async () => {
        // CONFIGURATION
        const successMessage = `Relative form data was updated user_id: ${user.id} form_id: ${formId}`;

        // CALL FUNCTION
        const updateSpy = jest.spyOn(relativeRepo, 'update').mockResolvedValue({
          affected: 1,
          raw: [],
          generatedMaps: [],
        });
        const data = await service.updateRelativeForm(
          user.id,
          formId,
          updateDto,
        );

        // TESTING
        expect(data).toBe(successMessage);
        expect(updateSpy).toHaveBeenCalledWith(
          { id: formId, profile: { user: { id: user.id } } },
          updateDto,
        );
      });

      it('should return https exception when update service fails', async () => {
        // CONFIGURATION
        const message = `form_id ${formId} not found`;
        // CALL FUNCTION
        jest
          .spyOn(relativeRepo, 'update')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '404', message }),
          );

        // TESTING
        await expect(
          service.updateRelativeForm(user.id, formId, updateDto),
        ).rejects.toThrow(
          new HttpException(
            `user ${message} do not exists`,
            HttpStatus.NOT_FOUND,
          ),
        );
      });

      it('should return http exception when update services return 0', async () => {
        // CONFIGURATION
        // CALL FUNCTIONS
        jest.spyOn(relativeRepo, 'update').mockResolvedValue({
          affected: 0,
          raw: [],
          generatedMaps: [],
        });

        // TESTING
        await expect(
          service.updateRelativeForm(user.id, formId, updateDto),
        ).rejects.toThrow(
          new HttpException(
            'Please contact service care or try again',
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });
  });
});
