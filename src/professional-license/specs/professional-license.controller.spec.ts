import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalLicenseController } from '../professional-license.controller';
import { ProfessionalLicenseService } from '../professional-license.service';
import { ErrorService } from '../../utils/ErrorService';
import { createMock } from '@golevelup/ts-jest';
import { ProfessionalLicenseEntity } from '../entities/professional-license.entity';
import { CreateProfessionalLicenseDto } from '../dto/create-professional-license.dto';
import { UpdateProfessionalLicenseDto } from '../dto/update-professional-license.dto';
import { faker } from '@faker-js/faker';
import { Usertype } from '../../utils/types/User';
import { UserRole } from '../../utils/RoleEnum';
import { GetLicenseDto } from '../dto/get-license.dto';
import { ItemsLicense } from '../types/licenseResponse';

describe('ProfessionalLicenseController', () => {
  let controller: ProfessionalLicenseController;
  let service: ProfessionalLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalLicenseController],
      providers: [
        {
          provide: ProfessionalLicenseService,
          useValue: createMock<ProfessionalLicenseEntity>(),
        },
        ErrorService,
      ],
    }).compile();

    controller = module.get<ProfessionalLicenseController>(
      ProfessionalLicenseController,
    );
    service = module.get<ProfessionalLicenseService>(
      ProfessionalLicenseService,
    );
  });

  describe('DEFINED', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('CONTROLLER', () => {
    let req: { user: Usertype };
    let createLicense: CreateProfessionalLicenseDto;
    let licenseEntity: ProfessionalLicenseEntity;
    let getLicense: GetLicenseDto;
    let updateLicense: UpdateProfessionalLicenseDto;
    let itemLicense: ItemsLicense;

    beforeEach(() => {
      req = {
        user: {
          id: faker.datatype.uuid(),
          role: UserRole.DENTIST,
        },
      };

      itemLicense = {
        anioreg: 0,
        desins: '',
        idCedula: '',
        inscons: 0,
        insedo: 0,
        libro: '',
        materno: faker.name.lastName(),
        maternoM: '',
        nombre: '',
        paterno: faker.name.lastName(),
        sexo: '1',
        tipo: '1',
        titulo: 'licenciada',
      };

      getLicense = {
        idCedula: '127382',
        materno: faker.name.lastName(),
        maxResult: '1000',
        nombre: faker.name.firstName(),
        paterno: faker.name.lastName(),
      };

      createLicense = {
        id_license: '12345',
      };

      licenseEntity = {
        degree: 'school_degree',
        id: faker.datatype.uuid(),
        id_license: createLicense.id_license,
        profile: undefined,
        school_degree: 'school_degree',
      };

      updateLicense = {
        ...createLicense,
        id_license: 'newId',
      };
    });

    it('createProfessionalLicense', async () => {
      // CONFIGURATION
      const spyCreate = jest
        .spyOn(service, 'createProfessionalLicense')
        .mockResolvedValue(licenseEntity);

      // CALL FUNCTIONS
      const response = await controller.createProfessionalLicense(
        createLicense,
        req,
      );
      // TESTING
      expect(response).toEqual(licenseEntity);
      expect(spyCreate).toBeCalledWith(createLicense, req.user.id);
    });

    it('getProfessionalLicense', async () => {
      // CONFIGURATION
      const spyGetLicense = jest
        .spyOn(service, 'getProfessionalLicense')
        .mockResolvedValue(itemLicense);

      // CALL FUNCTIONS
      const response = await controller.getProfessionalLicense(getLicense);

      // TESTING
      expect(response).toEqual(itemLicense);
      expect(spyGetLicense).toHaveBeenCalledWith(getLicense);
    });

    it('updateProfessionalLicense', async () => {
      // CONFIGURATION
      const fakeId = faker.datatype.uuid();
      const spyUpdate = jest
        .spyOn(service, 'updateProfessionalLicense')
        .mockResolvedValue('OK');

      // CALL FUNCTIONS
      const response = await controller.updateProfessionalLicense(
        updateLicense,
        fakeId,
        req,
      );

      // TESTING
      expect(response).toBe('OK');
      expect(spyUpdate).toHaveBeenCalledWith(
        updateLicense,
        fakeId,
        req.user.id,
      );
    });
  });
});
