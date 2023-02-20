import { UserEntity } from '../../../users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../utils/RoleEnum';

export const UserMock: UserEntity = {
  async hashPassword(): Promise<void> {
    return Promise.resolve(undefined);
  },
  createDateTime: faker.date.soon(),
  email: faker.internet.email(),
  id: faker.datatype.uuid(),
  lastChangedDateTime: faker.date.past(),
  password: faker.internet.password(),
  profile: {
    user: null,
    id: faker.datatype.uuid(),
    last_name: faker.name.lastName(),
    address: [],
    phone_number: faker.phone.number(),
    first_name: faker.name.firstName(),
  },
  role: UserRole.PATIENT,
  services: [],
  username: faker.internet.userName(),
};
