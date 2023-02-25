import { AddressEntity } from '../../entities/address.entity';
import { faker } from '@faker-js/faker';
import { UserRole } from '../../../utils/RoleEnum';
import { CreateAddressDto } from '../../dto/create-address.dto';
import { ProfileEntity } from '../../../profile/entities/profile.entity';
import { UpdateAddressDto } from '../../dto/update-address.dto';

export const MockAddress = (id: string): AddressEntity => ({
  full_address: faker.address.direction(),
  address_number_exterior: faker.address.buildingNumber(),
  profile: null,
  id,
  is_default: false,
  suburb: faker.address.street(),
  coordinates: [
    Number(faker.address.latitude()),
    Number(faker.address.longitude()),
  ],
  country: faker.address.country(),
  address_line: faker.address.streetAddress(),
  postal_code: faker.address.zipCode(),
  state: faker.address.state(),
  address_number_interior: faker.address.buildingNumber(),
});

export const MockFullAddress = (id: string): AddressEntity => ({
  full_address: faker.address.direction(),
  address_number_exterior: faker.address.buildingNumber(),
  profile: {
    id: faker.datatype.uuid(),
    address: [],
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone_number: faker.phone.number(),
    services: [],
    last_changed_date_time: faker.date.recent(),
    create_date_time: faker.date.past(),
    relatives_form: null,
    personal_form: null,
    user: {
      is_phone_verified: false,
      is_email_verified: false,
      profile: null,
      id,
      role: UserRole.PATIENT,
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      create_date_time: faker.date.past(),
      last_changed_date_time: faker.date.recent(),
      is_active: true,
      async hashPassword(): Promise<void> {
        console.log('hashPassword');
      },
    },
  },
  id: faker.datatype.uuid(),
  is_default: false,
  suburb: faker.address.street(),
  coordinates: [
    Number(faker.address.latitude()),
    Number(faker.address.longitude()),
  ],
  country: faker.address.country(),
  address_line: faker.address.streetAddress(),
  postal_code: faker.address.zipCode(),
  state: faker.address.state(),
  address_number_interior: faker.address.buildingNumber(),
});

export const MockCreateAddress = (
  id: string,
  createAddressDto: CreateAddressDto | UpdateAddressDto,
  profileId: string,
): AddressEntity => ({
  id,
  address_number_interior: createAddressDto.address_number_interior,
  state: createAddressDto.state,
  suburb: createAddressDto.suburb,
  address_line: createAddressDto.address_line,
  postal_code: createAddressDto.postal_code,
  country: createAddressDto.country,
  coordinates: createAddressDto.coordinates,
  profile: {
    id: profileId,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    user: null,
    address: null,
    phone_number: faker.phone.number(),
    services: [],
    last_changed_date_time: faker.date.recent(),
    create_date_time: faker.date.past(),
    relatives_form: null,
    personal_form: null,
  },
  full_address: createAddressDto.full_address,
  is_default: createAddressDto.is_default,
  address_number_exterior: createAddressDto.address_number_exterior,
});

export const MockProfile = (profileId: string): ProfileEntity => ({
  id: profileId,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  user: null,
  address: null,
  phone_number: faker.phone.number(),
  last_changed_date_time: faker.date.recent(),
  create_date_time: faker.date.past(),
  services: [],
  relatives_form: null,
  personal_form: null,
});
