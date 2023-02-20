import { faker } from '@faker-js/faker';
import { UpdateDentistServiceDto } from '../../dto/services/update-dentist-service.dto';
import { CurrencyEnum } from '../../types/currencyEnum';

export const updateServiceDto: UpdateDentistServiceDto = {
  amount: {
    total: Number(faker.finance.amount()),
    currency: CurrencyEnum.MXN,
  },
  description: faker.lorem.paragraph(1),
  name: faker.lorem.lines(1),
};

export const requestMock = {
  user: {
    id: faker.datatype.uuid(),
  },
};
