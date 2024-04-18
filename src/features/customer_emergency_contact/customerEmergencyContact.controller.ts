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
import { CustomerEmergencyContactService } from './customerEmergencyContact.service';
import { CreateCustomerEmergencyContactDto } from './dto/create-customerEmergencyContact.dto';
import { UpdateCustomerEmergencyContactDto } from './dto/update-customerEmergencyContact.dto';
import { CustomerEmergencyContactControllerInterface } from '@features/customer_emergency_contact/reposiotory/CustomerEmergencyContactController.interface';
import { RequestUserData } from '@utils/RequestUserData';
import { ResponseApi } from '@utils/ResponseApi';
import { CustomerEmergencyContactEntity } from '@features/customer_emergency_contact/entities/customerEmergencyContact.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { UserRole } from '@utils/RoleEnum';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseApi } from '@utils/ApiOkResponseApi';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Customer Emergency Contact')
@Controller('customerEmergencyContact')
export class CustomerEmergencyContactController
  implements CustomerEmergencyContactControllerInterface
{
  constructor(
    private readonly customerEmergencyContactService: CustomerEmergencyContactService,
  ) {}

  @Post()
  @ApiBody({ type: CreateCustomerEmergencyContactDto })
  @ApiOkResponseApi(CustomerEmergencyContactEntity)
  @RolesAuth(UserRole.CUSTOMER)
  createCustomerEmergencyContact(
    @Request() request: RequestUserData,
    @Body() createCustomerContact: CreateCustomerEmergencyContactDto,
  ): Promise<ResponseApi<CustomerEmergencyContactEntity>> {
    return this.customerEmergencyContactService.create(
      createCustomerContact,
      request.user.profileId,
    );
  }

  @Get()
  @RolesAuth(UserRole.CUSTOMER)
  findAllCustomerEmergencyContact(
    @Request() request: RequestUserData,
  ): Promise<ResponseApi<Array<CustomerEmergencyContactEntity>>> {
    return this.customerEmergencyContactService.findAll(request.user.profileId);
  }

  @Get(':id')
  @RolesAuth(UserRole.CUSTOMER)
  findOneCustomerEmergencyContact(
    @Request() request: RequestUserData,
    @Param('id') customerContactId: string,
  ): Promise<ResponseApi<CustomerEmergencyContactEntity>> {
    return this.customerEmergencyContactService.findOne(
      request.user.profileId,
      customerContactId,
    );
  }

  @Delete(':id')
  @RolesAuth(UserRole.CUSTOMER)
  removeCustomerEmergencyContact(
    @Request() request: RequestUserData,
    @Param('id') customerContactId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    return this.customerEmergencyContactService.remove(
      request.user.profileId,
      customerContactId,
    );
  }

  @Patch(':id')
  @RolesAuth(UserRole.CUSTOMER)
  updateCustomerEmergencyContact(
    @Request() request: RequestUserData,
    @Param('id') customerContactId: string,
    @Body() updateCustomerContact: UpdateCustomerEmergencyContactDto,
  ): Promise<ResponseApi<UpdateResult>> {
    return this.customerEmergencyContactService.update(
      request.user.profileId,
      customerContactId,
      updateCustomerContact,
    );
  }
}
