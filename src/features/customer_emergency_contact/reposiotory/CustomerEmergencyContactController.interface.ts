import { ResponseApi } from '@utils/ResponseApi';
import { CustomerEmergencyContactEntity } from '@features/customer_emergency_contact/entities/customerEmergencyContact.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RequestUserData } from '@utils/RequestUserData';
import { CreateCustomerEmergencyContactDto } from '@features/customer_emergency_contact/dto/create-customerEmergencyContact.dto';
import { UpdateCustomerEmergencyContactDto } from '@features/customer_emergency_contact/dto/update-customerEmergencyContact.dto';

export interface CustomerEmergencyContactControllerInterface {
  createCustomerEmergencyContact: (
    request: RequestUserData,
    createCustomerContact: CreateCustomerEmergencyContactDto,
  ) => Promise<ResponseApi<CustomerEmergencyContactEntity>>;
  findAllCustomerEmergencyContact: (
    request: RequestUserData,
  ) => Promise<ResponseApi<Array<CustomerEmergencyContactEntity>>>;
  findOneCustomerEmergencyContact: (
    request: RequestUserData,
    customerContactId: string,
  ) => Promise<ResponseApi<CustomerEmergencyContactEntity>>;
  updateCustomerEmergencyContact: (
    request: RequestUserData,
    customerContactId: string,
    updateCustomerContact: UpdateCustomerEmergencyContactDto,
  ) => Promise<ResponseApi<UpdateResult>>;
  removeCustomerEmergencyContact: (
    request: RequestUserData,
    customerContactId: string,
  ) => Promise<ResponseApi<DeleteResult>>;
}
