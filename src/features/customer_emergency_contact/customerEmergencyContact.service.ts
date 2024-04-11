import { Injectable } from '@nestjs/common';
import { CreateCustomerEmergencyContactDto } from './dto/create-customerEmergencyContact.dto';
import { UpdateCustomerEmergencyContactDto } from './dto/update-customerEmergencyContact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEmergencyContactEntity } from '@features/customer_emergency_contact/entities/customerEmergencyContact.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CustomerEmergencyContactServiceInterface } from '@features/customer_emergency_contact/reposiotory/CustomerEmergencyContactService.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { ErrorService } from '@utils/ErrorService';

@Injectable()
export class CustomerEmergencyContactService
  implements CustomerEmergencyContactServiceInterface
{
  constructor(
    @InjectRepository(CustomerEmergencyContactEntity)
    private readonly customerEmergencyContactEntity: Repository<CustomerEmergencyContactEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async create(
    createCustomerContact: CreateCustomerEmergencyContactDto,
    profileId: string,
  ): Promise<ResponseApi<CustomerEmergencyContactEntity>> {
    try {
      const emergencyContacts = this.customerEmergencyContactEntity.create({
        ...createCustomerContact,
        customerProfile: { id: profileId },
      });
      const contactEntity = await this.customerEmergencyContactEntity.save(
        emergencyContacts,
      );

      return new ResponseApi(contactEntity, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async findAll(
    profileId: string,
  ): Promise<ResponseApi<Array<CustomerEmergencyContactEntity>>> {
    try {
      const contactEntities = await this.customerEmergencyContactEntity.find({
        where: { customerProfile: { id: profileId } },
      });

      return new ResponseApi(contactEntities, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async findOne(
    profileId: string,
    contactId: string,
  ): Promise<ResponseApi<CustomerEmergencyContactEntity>> {
    try {
      const contactEntity = await this.customerEmergencyContactEntity.findOne({
        where: { id: contactId, customerProfile: { id: profileId } },
      });

      return new ResponseApi(contactEntity, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async remove(
    profileId: string,
    contactId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    try {
      const contactEntityDeleted =
        await this.customerEmergencyContactEntity.delete({
          id: contactId,
          customerProfile: { id: profileId },
        });

      return new ResponseApi(contactEntityDeleted, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async update(
    profileId: string,
    contactId: string,
    updateCustomerContact: UpdateCustomerEmergencyContactDto,
  ): Promise<ResponseApi<UpdateResult>> {
    try {
      const contactEntityUpdated =
        await this.customerEmergencyContactEntity.update(
          {
            id: contactId,
            customerProfile: { id: profileId },
          },
          updateCustomerContact,
        );

      return new ResponseApi(contactEntityUpdated, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
