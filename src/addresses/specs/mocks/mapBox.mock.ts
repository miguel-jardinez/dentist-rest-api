import { AddressType } from '../../types/address.type';
import { faker } from '@faker-js/faker';

export const MockAddressMapBox: AddressType = {
  features: [
    {
      id: faker.datatype.uuid(),
      place_type: [faker.address.streetAddress()],
      text_es: 'es',
      place_name_es: faker.address.streetAddress(),
      text: faker.address.streetAddress(),
      center: ['20.1283', '-30.1829304'],
      address: faker.address.streetAddress(),
      context: [],
    },
  ],
  query: [],
  type: 'Mock_Result',
};
