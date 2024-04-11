import { ResponseApi } from '@utils/ResponseApi';
import { CustomerEmergencyContactEntity } from '@features/customer_emergency_contact/entities/customerEmergencyContact.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCustomerEmergencyContactDto } from '@features/customer_emergency_contact/dto/create-customerEmergencyContact.dto';
import { UpdateCustomerEmergencyContactDto } from '@features/customer_emergency_contact/dto/update-customerEmergencyContact.dto';

export interface CustomerEmergencyContactServiceInterface {
  create: (
    createCustomerContact: CreateCustomerEmergencyContactDto,
    profileId: string,
  ) => Promise<ResponseApi<CustomerEmergencyContactEntity>>;
  findAll: (
    profileId: string,
  ) => Promise<ResponseApi<Array<CustomerEmergencyContactEntity>>>;
  findOne: (
    profileId: string,
    contactId: string,
  ) => Promise<ResponseApi<CustomerEmergencyContactEntity>>;
  update: (
    profileId: string,
    contactId: string,
    updateCustomerContact: UpdateCustomerEmergencyContactDto,
  ) => Promise<ResponseApi<UpdateResult>>;
  remove: (
    profileId: string,
    contactId: string,
  ) => Promise<ResponseApi<DeleteResult>>;
}
