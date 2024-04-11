import { Injectable } from '@nestjs/common';
import { CreateCustomerFamiliarClinicHistoryDto } from './dto/create-customer_familiar_clinic_history.dto';
import { UpdateCustomerFamiliarClinicHistoryDto } from './dto/update-customer_familiar_clinic_history.dto';

@Injectable()
export class CustomerFamiliarClinicHistoryService {
  create(createCustomerFamiliarClinicHistoryDto: CreateCustomerFamiliarClinicHistoryDto) {
    return 'This action adds a new customerFamiliarClinicHistory';
  }

  findAll() {
    return `This action returns all customerFamiliarClinicHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerFamiliarClinicHistory`;
  }

  update(id: number, updateCustomerFamiliarClinicHistoryDto: UpdateCustomerFamiliarClinicHistoryDto) {
    return `This action updates a #${id} customerFamiliarClinicHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerFamiliarClinicHistory`;
  }
}
