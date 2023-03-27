import { DentistServiceEntity } from '../../entities/dentist-service.entity';
import { faker } from '@faker-js/faker';
import { AmountEntityEntity } from '../../entities/amount-entity.entity';

export const MockDentistService: DentistServiceEntity = {
  amount: {
    id: faker.datatype.uuid(),
    service: null,
    total: Number(faker.finance.amount()),
    currency: 'MXN',
  },
  description: faker.lorem.paragraph(10),
  id: faker.datatype.uuid(),
  name: faker.name.jobTitle(),
  profile: null,
  is_visible: true,
};

export const MockAmountService: AmountEntityEntity = {
  currency: 'MXN',
  id: faker.datatype.uuid(),
  service: null,
  total: Number(faker.finance.amount()),
};

export const ListMockServices: DentistServiceEntity[] = [
  MockDentistService,
  MockDentistService,
  MockDentistService,
  MockDentistService,
];
