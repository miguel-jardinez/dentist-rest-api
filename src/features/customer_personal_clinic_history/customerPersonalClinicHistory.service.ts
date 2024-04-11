import { Injectable } from '@nestjs/common';
import { CreateCustomerPersonalClinicHistoryDto } from './dto/create-customer_personal_clinic_history.dto';
import { UpdateCustomerPersonalClinicHistoryDto } from './dto/update-customer_personal_clinic_history.dto';

@Injectable()
export class CustomerPersonalClinicHistoryService {
  create(createCustomerPersonalClinicHistoryDto: CreateCustomerPersonalClinicHistoryDto) {
    return 'This action adds a new customerPersonalClinicHistory';
  }

  findAll() {
    return `This action returns all customerPersonalClinicHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerPersonalClinicHistory`;
  }

  update(id: number, updateCustomerPersonalClinicHistoryDto: UpdateCustomerPersonalClinicHistoryDto) {
    return `This action updates a #${id} customerPersonalClinicHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerPersonalClinicHistory`;
  }
}
