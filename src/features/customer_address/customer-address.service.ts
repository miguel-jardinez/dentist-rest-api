import { Injectable } from '@nestjs/common';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { CustomerAddressServiceInterface } from '@features/customer_address/repository/customerAddressService.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { CustomerAddressEntity } from '@features/customer_address/entities/customer-address.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorService } from '@utils/ErrorService';

@Injectable()
export class CustomerAddressService implements CustomerAddressServiceInterface {
  constructor(
    @InjectRepository(CustomerAddressEntity)
    private readonly customerAddressRepository: Repository<CustomerAddressEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async createCustomerAddress(
    profileId: string,
    createCustomerAddressDto: CreateCustomerAddressDto,
  ): Promise<ResponseApi<CustomerAddressEntity>> {
    try {
      const address = this.customerAddressRepository.create({
        ...createCustomerAddressDto,
        customer: { id: profileId },
      });
      const addressEntity = await this.customerAddressRepository.save(address);
      return new ResponseApi(addressEntity, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async deleteCustomerAddress(
    profileId: string,
    addressId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    try {
      const addressEntity = await this.customerAddressRepository.delete({
        id: addressId,
        customer: { id: profileId },
      });
      return new ResponseApi(addressEntity, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getAllAddresses(
    profileId: string,
  ): Promise<ResponseApi<Array<CustomerAddressEntity>>> {
    try {
      const addressEntity = await this.customerAddressRepository.find({
        where: { customer: { id: profileId } },
        relations: { state: true },
      });
      return new ResponseApi(addressEntity, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getOnAddress(
    profileId: string,
    addressId: string,
  ): Promise<ResponseApi<CustomerAddressEntity>> {
    try {
      const addressEntity = await this.customerAddressRepository.findOne({
        where: { id: addressId, customer: { id: profileId } },
        relations: { state: true },
      });
      return new ResponseApi(addressEntity, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async updateAddress(
    profileId: string,
    addressId: string,
    updateCustomerAddressDto: UpdateCustomerAddressDto,
  ): Promise<ResponseApi<UpdateResult>> {
    try {
      const addressEntity = await this.customerAddressRepository.update(
        { id: addressId, customer: { id: profileId } },
        {
          ...updateCustomerAddressDto,
          state: { id: updateCustomerAddressDto.state.id },
        },
      );

      return new ResponseApi(addressEntity, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
