import { Injectable } from '@nestjs/common';
import { CreateDentistAddressDto } from './dto/create-dentist-establishment-address.dto';
import { UpdateDentistAddressDto } from './dto/update-dentist-establishment-address.dto';

@Injectable()
export class EstablishmentAddressService {
  create(createDentistAddressDto: CreateDentistAddressDto) {
    return `This action adds a new dentistAddress ${JSON.stringify(createDentistAddressDto)}`;
  }

  findAll() {
    return `This action returns all dentistAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dentistAddress`;
  }

  update(id: number, updateDentistAddressDto: UpdateDentistAddressDto) {
    return `This action updates a #${id} dentistAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} dentistAddress`;
  }
}
