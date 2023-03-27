import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../profile.controller';
import { ProfileService } from '../profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Usertype } from '../../utils/types/User';
import { UserRole } from '../../utils/RoleEnum';
import { ProfileEntity } from '../entities/profile.entity';

const mock_id = 'mock_id';

const requestController = {
  user: {
    id: mock_id,
  },
};

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: createMock<ProfileService>(),
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    controller = module.get<ProfileController>(ProfileController);
  });

  describe('Defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(controller).toBeDefined();
    });
  });

  describe('createProfile', () => {
    it('should return successfully string when profiles is created', async () => {
      const textResponse = 'Profile added Successfully';
      const dataMock: CreateProfileDto = {
        father_last_name: faker.name.lastName(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        phone_number: faker.phone.number(),
      };

      jest
        .spyOn(service, 'create')
        .mockReturnValue(Promise.resolve(textResponse));

      const data = await controller.createProfile(dataMock, requestController);

      expect(service.create).toHaveBeenCalled();
      expect(data).toBe(textResponse);
    });
  });

  describe('Update', () => {
    it('Update user when pass correct id and return string', async () => {
      // CONFIGURATION
      const textResponse = `User ${mock_id} has been updated successfully`;

      const dataMock: UpdateProfileDto = {
        father_last_name: faker.name.lastName(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        phone_number: faker.phone.number(),
      };

      // CALL FUNCTIONS
      jest
        .spyOn(service, 'update')
        .mockReturnValue(Promise.resolve(textResponse));

      const data = await controller.update(mock_id, dataMock);

      // TESTING
      expect(service.update).toHaveBeenCalledWith('mock_id', dataMock);
      expect(data).toBe(textResponse);
    });
  });

  describe('GET PROFILE', () => {
    it('should return profile entity', async () => {
      // CONFIGURATION
      const req: { user: Usertype } = {
        user: {
          id: faker.datatype.uuid(),
          role: UserRole.PATIENT,
        },
      };

      const profileResponse: ProfileEntity = {
        create_date_time: faker.date.past(),
        father_last_name: faker.name.lastName(),
        id: faker.datatype.uuid(),
        last_changed_date_time: faker.date.recent(),
        mother_last_name: faker.name.lastName(),
        name: faker.name.fullName(),
        user: null,
      };

      // CALL FUNCTIONS
      const findUserSpy = jest
        .spyOn(service, 'findByUserId')
        .mockResolvedValue(profileResponse);

      const data = await controller.getProfile(req);

      // TESTING
      expect(data).toEqual(profileResponse);
      expect(findUserSpy).toHaveBeenCalledWith(req.user);
    });
  });
});
