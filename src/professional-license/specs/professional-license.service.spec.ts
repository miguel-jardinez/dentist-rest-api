import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalLicenseService } from '../professional-license.service';
import { ErrorService } from '../../utils/ErrorService';
import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { ProfileService } from '../../profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessionalLicenseEntity } from '../entities/professional-license.entity';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { CreateProfessionalLicenseDto } from '../dto/create-professional-license.dto';
import { UpdateProfessionalLicenseDto } from '../dto/update-professional-license.dto';
import { faker } from '@faker-js/faker';
import { Usertype } from '../../utils/types/User';
import { UserRole } from '../../utils/RoleEnum';
import { ItemsLicense } from '../types/licenseResponse';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetLicenseDto } from '../dto/get-license.dto';

type KeyTypes = 'PROFESSIONAL_LICENSE_URL';

const errorMessage = (message: string) =>
  `user user ${message} do not exists do not exists`;

const paterno = faker.name.lastName();
const materno = faker.name.lastName();
const name = faker.name.fullName();
const license = '1234';

const itemLicence: ItemsLicense = {
  anioreg: 0,
  desins: '',
  idCedula: license,
  inscons: 0,
  insedo: 0,
  libro: '',
  materno,
  maternoM: '',
  nombre: name,
  paterno,
  sexo: '2',
  tipo: '',
  titulo: faker.lorem.text(),
};

describe('ProfessionalLicenseService', () => {
  let service: ProfessionalLicenseService;
  let professionalRepo: Repository<ProfessionalLicenseEntity>;
  let httpService: HttpService;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessionalLicenseService,
        ErrorService,
        {
          provide: ProfileService,
          useValue: createMock<ProfileService>(),
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              post: jest.fn(() => {
                return Promise.resolve({ data: { items: [itemLicence] } });
              }),
            },
          },
        },
        {
          provide: getRepositoryToken(ProfessionalLicenseEntity),
          useValue: createMock<ProfessionalLicenseEntity>(),
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: KeyTypes) => {
              switch (key) {
                case 'PROFESSIONAL_LICENSE_URL':
                  return 'https://mock.com';

                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    profileService = module.get<ProfileService>(ProfileService);
    httpService = module.get<HttpService>(HttpService);
    professionalRepo = module.get<Repository<ProfessionalLicenseEntity>>(
      getRepositoryToken(ProfessionalLicenseEntity),
    );
    service = module.get<ProfessionalLicenseService>(
      ProfessionalLicenseService,
    );
  });

  describe('DEFINED', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(professionalRepo).toBeDefined();
      expect(httpService).toBeDefined();
      expect(profileService).toBeDefined();
    });
  });

  describe('TEST SERVICE', () => {
    let profile: ProfileEntity;
    let createDto: CreateProfessionalLicenseDto;
    let updateDto: UpdateProfessionalLicenseDto;
    let professionalEntity: ProfessionalLicenseEntity;
    let user: Usertype;

    beforeEach(() => {
      user = {
        id: faker.datatype.uuid(),
        role: UserRole.PATIENT,
      };

      profile = {
        create_date_time: faker.date.past(),
        father_last_name: paterno,
        id: faker.datatype.uuid(),
        last_changed_date_time: faker.date.recent(),
        mother_last_name: materno,
        name: name,
        user: null,
      };

      createDto = {
        id_license: license,
      };

      updateDto = {
        id_license: license,
      };

      professionalEntity = {
        degree: faker.lorem.lines(1),
        id: faker.datatype.uuid(),
        id_license: createDto.id_license,
        profile: undefined,
        school_degree: faker.lorem.text(),
      };
    });

    describe('CREATE', () => {
      it('should return professional license when service save the entity', async () => {
        // CONFIGURATION
        // CALL FUNCTIONS
        const profileSpy = jest
          .spyOn(profileService, 'findByUserId')
          .mockResolvedValue(profile);

        const licenseSpy = jest
          .spyOn(service, 'getProfessionalLicense')
          .mockResolvedValue(itemLicence);

        const createSpy = jest
          .spyOn(professionalRepo, 'create')
          .mockReturnValue(professionalEntity);

        const saveSpy = jest
          .spyOn(professionalRepo, 'save')
          .mockResolvedValue(professionalEntity);

        const data = await service.createProfessionalLicense(createDto, user);

        // TESTING
        expect(data).toEqual(professionalEntity);
        expect(profileSpy).toHaveBeenCalledWith(user);
        expect(licenseSpy).toHaveBeenCalled();
        expect(createSpy).toHaveBeenCalledWith({
          id_license: itemLicence.idCedula,
          school_degree: itemLicence.desins,
          degree: itemLicence.titulo,
        });
        expect(saveSpy).toHaveBeenCalledWith({
          ...professionalEntity,
          profile: { id: profile.id },
        });
      });

      it('should return error when name of professional and license are different', async () => {
        // CONFIGURATION
        const errorLicenseItem = {
          ...itemLicence,
          nombre: 'Error name',
        };

        const message =
          'License number or name it is incorrect please try again';

        // CALL FUNCTIONS
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);

        jest
          .spyOn(service, 'getProfessionalLicense')
          .mockResolvedValue(errorLicenseItem);

        // TESTING
        await expect(
          service.createProfessionalLicense(createDto, user),
        ).rejects.toThrow(
          new HttpException(errorMessage(message), HttpStatus.NOT_FOUND),
        );
      });

      it('should return error if some service got error', async () => {
        // CONFIGURATION
        const message = 'mock error';

        // CALL FUNCTIONS
        jest
          .spyOn(profileService, 'findByUserId')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '404', message }),
          );

        // TESTING
        await expect(
          service.createProfessionalLicense(createDto, user),
        ).rejects.toThrow(
          new HttpException(
            `user ${message} do not exists`,
            HttpStatus.NOT_FOUND,
          ),
        );
      });

      it('should return error when profile is null', async () => {
        // CONFIGURATION
        // CALL FUNCTIONS
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(null);

        // TESTING
        await expect(
          service.createProfessionalLicense(createDto, user),
        ).rejects.toThrow(
          new HttpException(errorMessage(undefined), HttpStatus.NOT_FOUND),
        );
      });
    });

    describe('UPDATE', () => {
      it('should return success message when license was updated', async () => {
        // CONFIGURATION
        const message = `License number ${itemLicence.idCedula} was updates with degree ${itemLicence.titulo}`;

        // CALL FUNCTIONS
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);

        const licenseSpy = jest
          .spyOn(service, 'getProfessionalLicense')
          .mockResolvedValue(itemLicence);

        const updateSpy = jest
          .spyOn(professionalRepo, 'update')
          .mockResolvedValue({
            affected: 1,
            raw: [],
            generatedMaps: [],
          });

        const data = await service.updateProfessionalLicense(
          updateDto,
          itemLicence.idCedula,
          user,
        );

        // TESTING
        expect(data).toBe(message);
        expect(licenseSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalledWith(
          {
            profile: { user: { id: user.id, role: UserRole.DENTIST } },
          },
          {
            id_license: itemLicence.idCedula,
            degree: itemLicence.titulo,
            school_degree: itemLicence.desins,
          },
        );
      });

      it('should return error when name license and profile are different', async () => {
        // CONFIGURATION
        const errorLicenseItem = {
          ...itemLicence,
          nombre: 'Error name',
        };

        // CALL FUNCTIONS
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);

        jest
          .spyOn(service, 'getProfessionalLicense')
          .mockResolvedValue(errorLicenseItem);

        // TESTING
        await expect(
          service.updateProfessionalLicense(
            updateDto,
            itemLicence.idCedula,
            user,
          ),
        ).rejects.toThrow(
          new HttpException(
            'Please contact service care or try again',
            HttpStatus.NOT_FOUND,
          ),
        );
      });

      it('should return error when update service affected 0', async () => {
        // CONFIGURATION
        // CALL FUNCTIONS
        jest.spyOn(profileService, 'findByUserId').mockResolvedValue(profile);

        jest
          .spyOn(service, 'getProfessionalLicense')
          .mockResolvedValue(itemLicence);

        jest.spyOn(professionalRepo, 'update').mockResolvedValue({
          affected: 0,
          raw: [],
          generatedMaps: [],
        });

        // TESTING
        await expect(
          service.updateProfessionalLicense(
            updateDto,
            itemLicence.idCedula,
            user,
          ),
        ).rejects.toThrow(
          new HttpException(
            'Please contact service care or try again',
            HttpStatus.BAD_GATEWAY,
          ),
        );
      });

      it('should return error when some service got error', async () => {
        // CONFIGURATION
        const licenseId = faker.datatype.uuid();
        const message = 'mock error';

        // CALL FUNCTIONS
        jest
          .spyOn(service, 'getProfessionalLicense')
          .mockImplementationOnce(() =>
            Promise.reject({ code: '404', message }),
          );

        // TESTING
        await expect(
          service.updateProfessionalLicense(updateDto, licenseId, user),
        ).rejects.toThrow(
          new HttpException(
            'user mock error do not exists',
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });

    describe('GET PROFESSIONAL LICENSE', () => {
      it('should return license item when pass json object correctly', async () => {
        // CONFIGURATION
        const licenseDto: GetLicenseDto = {
          idCedula: '1234',
          materno: '',
          maxResult: '',
          nombre: '',
          paterno: '',
        };

        // CALL FUNCTIONS
        const data = await service.getProfessionalLicense(licenseDto);

        // TESTING
        expect(data).toBe(itemLicence);
      });

      it('should return error when license is null', async () => {
        // CONFIGURATION
        const licenseDto: GetLicenseDto = {
          idCedula: '893',
          materno: '',
          maxResult: '',
          nombre: '',
          paterno: '',
        };

        // TESTING
        await expect(
          service.getProfessionalLicense(licenseDto),
        ).rejects.toThrow(
          new HttpException(
            'user user Professional license with id 893 not found do not exists do not exists',
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });
  });
});
