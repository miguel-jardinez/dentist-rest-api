import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../profile.controller';
import { ProfileService } from '../profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

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
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
          },
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
        phone_number: 'mock_phone_number',
        last_name: 'mock_last_name',
        first_name: 'mock_firs_name',
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
      const textResponse = `User ${mock_id} has been updated successfully`;

      const dataMock: CreateProfileDto = {
        phone_number: 'mock_phone_number',
        last_name: 'mock_last_name',
        first_name: 'mock_firs_name',
      };

      jest
        .spyOn(service, 'update')
        .mockReturnValue(Promise.resolve(textResponse));

      const data = await service.update(mock_id, dataMock);

      expect(service.update).toHaveBeenCalledWith('mock_id', dataMock);
      expect(data).toBe(textResponse);
    });
  });
});
