import { ResponseApi } from '@utils/ResponseApi';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { UpdateProfileDto } from '@features/customer_profile/dto/update-profile.dto';
import { UpdateResult } from 'typeorm';
import { CreateProfileDto } from '@features/customer_profile/dto/create-profile.dto';

export interface CustomerProfileEntityInterface {
  createProfile: (
    createProfile: CreateProfileDto,
    userId: string,
  ) => Promise<ResponseApi<CustomerProfileEntity>>;
  findCustomerProfile: (
    id: string,
  ) => Promise<ResponseApi<CustomerProfileEntity>>;
  updateCustomerProfile: (
    id: string,
    updateCustomerProfile: UpdateProfileDto,
  ) => Promise<ResponseApi<UpdateResult>>;
}
