import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomerAddressService } from './customer-address.service';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { CustomerAddressControllerInterface } from '@features/customer_address/repository/customerAddressController.interface';
import { RequestUserData } from '@utils/RequestUserData';
import { ResponseApi } from '@utils/ResponseApi';
import { CustomerAddressEntity } from '@features/customer_address/entities/customer-address.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { UserRole } from '@utils/RoleEnum';
import { RolesGuard } from '@guards/roles/roles.guard';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseApi } from '@utils/ApiOkResponseApi';
import { OkResponseArrayApi } from '@utils/OkResponseArrayApi';

@ApiTags('Customer Address')
@Controller('customerAddresses')
@UseGuards(AuthGuard('jwt'))
export class CustomerAddressController
  implements CustomerAddressControllerInterface
{
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @Post()
  @RolesAuth(UserRole.CUSTOMER)
  @UseGuards(RolesGuard)
  @ApiBody({ type: CreateCustomerAddressDto })
  @ApiOkResponseApi(CustomerAddressEntity)
  createCustomerAddress(
    @Request() request: RequestUserData,
    @Body() createCustomerAddressDto: CreateCustomerAddressDto,
  ): Promise<ResponseApi<CustomerAddressEntity>> {
    return this.customerAddressService.createCustomerAddress(
      request.user.profileId,
      createCustomerAddressDto,
    );
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @RolesAuth(UserRole.CUSTOMER)
  @ApiParam({ name: 'id' })
  @ApiOkResponseApi(DeleteResult)
  deleteCustomerAddress(
    @Request() request: RequestUserData,
    @Param('id') addressId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    return this.customerAddressService.deleteCustomerAddress(
      request.user.profileId,
      addressId,
    );
  }

  @Get()
  @UseGuards(RolesGuard)
  @RolesAuth(UserRole.CUSTOMER)
  @OkResponseArrayApi(CustomerAddressEntity)
  getAllAddresses(
    @Request() request: RequestUserData,
  ): Promise<ResponseApi<Array<CustomerAddressEntity>>> {
    return this.customerAddressService.getAllAddresses(request.user.profileId);
  }

  @Get('/:id')
  @UseGuards(RolesGuard)
  @RolesAuth(UserRole.CUSTOMER)
  @ApiOkResponseApi(CustomerAddressEntity)
  @ApiParam({ name: 'id' })
  getOneAddress(
    @Request() request: RequestUserData,
    @Param('id') addressId: string,
  ): Promise<ResponseApi<CustomerAddressEntity>> {
    return this.customerAddressService.getOnAddress(
      request.user.profileId,
      addressId,
    );
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @RolesAuth(UserRole.CUSTOMER)
  @ApiBody({ type: UpdateCustomerAddressDto })
  @ApiOkResponseApi(UpdateResult)
  updateAddress(
    @Request() request: RequestUserData,
    @Param('id') addressId: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,
  ): Promise<ResponseApi<UpdateResult>> {
    return this.customerAddressService.updateAddress(
      request.user.profileId,
      addressId,
      updateCustomerAddressDto,
    );
  }
}
