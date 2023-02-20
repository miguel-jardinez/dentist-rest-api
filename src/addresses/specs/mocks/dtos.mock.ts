import { CreateAddressDto } from '../../dto/create-address.dto';
import { faker } from '@faker-js/faker';
import { UpdateAddressDto } from '../../dto/update-address.dto';

export const createDto: CreateAddressDto = {
  address_line: faker.address.streetAddress(),
  address_number_exterior: faker.address.buildingNumber(),
  address_number_interior: faker.address.buildingNumber(),
  coordinates: [
    Number(faker.address.longitude()),
    Number(faker.address.latitude()),
  ],
  country: faker.address.country(),
  full_address: faker.address.secondaryAddress(),
  is_default: false,
  postal_code: faker.address.zipCode(),
  state: faker.address.state(),
  suburb: faker.address.state(),
};

export const requestMock = {
  user: {
    id: faker.datatype.uuid(),
  },
};

export const updateDto: UpdateAddressDto = {
  coordinates: [],
  country: faker.address.country(),
  postal_code: faker.address.zipCode(),
  address_line: faker.address.streetAddress(),
  address_number_interior: faker.address.buildingNumber(),
  address_number_exterior: faker.address.buildingNumber(),
  state: faker.address.state(),
  is_default: true,
  suburb: faker.address.state(),
};
