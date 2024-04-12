import { ResponseApi } from '@utils/ResponseApi';
import { CustomerAddressEntity } from '@features/customer_address/entities/customer-address.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateCustomerAddressDto } from '@features/customer_address/dto/update-customer-address.dto';
import { CreateCustomerAddressDto } from '@features/customer_address/dto/create-customer-address.dto';

export interface CustomerAddressServiceInterface {
  createCustomerAddress: (profileId: string, createCustomerAddressDto: CreateCustomerAddressDto) => Promise<ResponseApi<CustomerAddressEntity>>
  getAllAddresses: (profileId: string) => Promise<ResponseApi<Array<CustomerAddressEntity>>>;
  getOnAddress: (profileId: string, addressId: string) => Promise<ResponseApi<CustomerAddressEntity>>;
  updateAddress: (profileId: string, addressId: string, updateCustomerAddressDto: UpdateCustomerAddressDto) => Promise<ResponseApi<UpdateResult>>
  deleteCustomerAddress: (profileId: string, addressId: string) => Promise<ResponseApi<DeleteResult>>
}
