import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository, UpdateResult } from 'typeorm';
import { CustomerProfileEntity } from './entities/customerProfile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerProfileEntityInterface } from '@features/customer_profile/repository/customerProfileService.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { ErrorService } from '@utils/ErrorService';
import { CreateProfileDto } from '@features/customer_profile/dto/create-profile.dto';

@Injectable()
export class CustomerProfileService implements CustomerProfileEntityInterface {
  constructor(
    @InjectRepository(CustomerProfileEntity)
    private readonly profileRepository: Repository<CustomerProfileEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async createProfile(
    createProfile: CreateProfileDto,
    userId: string,
  ): Promise<ResponseApi<CustomerProfileEntity>> {
    try {
      const profile = this.profileRepository.create({
        ...createProfile,
        user: { id: userId },
      });
      const profileCreated = await this.profileRepository.save(profile);

      return new ResponseApi(profileCreated, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }

  async findCustomerProfile(
    profileId: string,
  ): Promise<ResponseApi<CustomerProfileEntity>> {
    try {
      const profile = await this.profileRepository.findOneByOrFail({ id: profileId });
      return new ResponseApi(profile, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }

  async updateCustomerProfile(
    id: string,
    updateCustomerProfile: UpdateProfileDto,
  ): Promise<ResponseApi<UpdateResult>> {
    try {
      const profileUpdated = await this.profileRepository.update(
        { id },
        updateCustomerProfile,
      );
      return new ResponseApi(profileUpdated, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }
}
