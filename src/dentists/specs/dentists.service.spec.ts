import { Test, TestingModule } from '@nestjs/testing';
import { DentistsService } from '../dentists.service';
import { UsersService } from '../../users/users.service';
import { createMock } from '@golevelup/ts-jest';
import { ErrorService } from '../../utils/ErrorService';

describe('DentistsService', () => {
  let service: DentistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DentistsService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        ErrorService,
      ],
    }).compile();

    service = module.get<DentistsService>(DentistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
