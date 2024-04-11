import { ResponseApi } from '@utils/ResponseApi';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { UpdateProfileDto } from '@features/customer_profile/dto/update-profile.dto';
import { UpdateResult } from 'typeorm';
import { RequestUserData } from '@utils/RequestUserData';

export interface CustomerProfileControllerInterface {
  findCustomerProfile: (
    userId: RequestUserData,
  ) => Promise<ResponseApi<CustomerProfileEntity>>;
  updateCustomerProfile: (
    request: RequestUserData,
    updateCustomerProfile: UpdateProfileDto,
  ) => Promise<ResponseApi<UpdateResult>>;
}
