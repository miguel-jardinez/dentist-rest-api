import { ID_MOCK, LIST_USERS_MOCK, OneUserMockId } from './mocks';
import { CreateUserDto } from '../../dto/create-user.dto';

export class MockUserService {
  findAll() {
    return LIST_USERS_MOCK;
  }

  findById(id: string) {
    return OneUserMockId(id);
  }

  remove(id: string) {
    return `User ${id} was deleted successfully`;
  }

  create(createUserDto: CreateUserDto) {
    return {
      ...createUserDto,
      id: ID_MOCK,
    };
  }
}
