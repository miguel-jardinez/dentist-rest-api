import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomerProfileService } from './customerProfile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@utils/RoleEnum';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { CustomerProfileControllerInterface } from '@features/customer_profile/repository/customerProfileController.interface';
import { RequestUserData } from '@utils/RequestUserData';
import { ResponseApi } from '@utils/ResponseApi';
import { CustomerProfileEntity } from '@features/customer_profile/entities/customerProfile.entity';
import { UpdateResult } from 'typeorm';

@Controller('customerProfile')
@UseGuards(AuthGuard('jwt'))
export class CustomerProfileController
  implements CustomerProfileControllerInterface
{
  constructor(private readonly profileService: CustomerProfileService) {}

  @Get()
  @RolesAuth(UserRole.CUSTOMER)
  findCustomerProfile(
    @Request() request: RequestUserData,
  ): Promise<ResponseApi<CustomerProfileEntity>> {
    return this.profileService.findCustomerProfile(request.user.profileId);
  }

  @Patch()
  @RolesAuth(UserRole.CUSTOMER)
  updateCustomerProfile(
    @Request() request: RequestUserData,
    @Body() updateCustomerProfile: UpdateProfileDto,
  ): Promise<ResponseApi<UpdateResult>> {
    return this.profileService.updateCustomerProfile(
      request.user.profileId,
      updateCustomerProfile,
    );
  }
}
