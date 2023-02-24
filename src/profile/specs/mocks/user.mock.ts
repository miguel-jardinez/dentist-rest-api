import { UserEntity } from '../../../users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../utils/RoleEnum';

export const UserMock: UserEntity = {
  async hashPassword(): Promise<void> {
    return Promise.resolve(undefined);
  },
  create_date_time: faker.date.soon(),
  email: faker.internet.email(),
  id: faker.datatype.uuid(),
  is_active: true,
  last_changed_date_time: faker.date.past(),
  password: faker.internet.password(),
  profile: {
    user: null,
    id: faker.datatype.uuid(),
    last_name: faker.name.lastName(),
    address: [],
    phone_number: faker.phone.number(),
    first_name: faker.name.firstName(),
    create_date_time: faker.date.past(),
    last_changed_date_time: faker.date.recent(),
    services: [],
    relatives_form: null,
    personal_form: null,
  },
  role: UserRole.PATIENT,
  username: faker.internet.userName(),
};
