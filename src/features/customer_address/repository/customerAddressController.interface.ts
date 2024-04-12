import { ResponseApi } from '@utils/ResponseApi';
import { CustomerAddressEntity } from '@features/customer_address/entities/customer-address.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateCustomerAddressDto } from '@features/customer_address/dto/update-customer-address.dto';
import { CreateCustomerAddressDto } from '@features/customer_address/dto/create-customer-address.dto';
import { RequestUserData } from '@utils/RequestUserData';

export interface CustomerAddressControllerInterface {
  createCustomerAddress: (request: RequestUserData, createCustomerAddressDto: CreateCustomerAddressDto) => Promise<ResponseApi<CustomerAddressEntity>>
  getAllAddresses: (request: RequestUserData) => Promise<ResponseApi<Array<CustomerAddressEntity>>>;
  getOnAddress: (request: RequestUserData, addressId: string) => Promise<ResponseApi<CustomerAddressEntity>>;
  updateAddress: (request: RequestUserData, addressId: string, updateCustomerAddressDto: UpdateCustomerAddressDto) => Promise<ResponseApi<UpdateResult>>
  deleteCustomerAddress: (request: RequestUserData, addressId: string) => Promise<ResponseApi<DeleteResult>>
}
