import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { ErrorService } from '@utils/ErrorService';
import { DentistServiceEntity } from '@features/dentist-services/entities/dentist-service.entity';
import { DentistServicesServiceInterface } from '@features/dentist-services/repository/dentist-services.service.interface';
import { CreateDentistServiceDto } from '@features/dentist-services/dto/services/create-dentist-service.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { DeleteDentistServiceDto } from '@features/dentist-services/dto/services/delete-dentist-service.dto';
import { UpdateDentistServiceDto } from '@features/dentist-services/dto/services/update-dentist-service.dto';

@Injectable()
export class DentistServicesService implements DentistServicesServiceInterface {
  constructor(
    @InjectRepository(DentistServiceEntity)
    private readonly serviceRepository: Repository<DentistServiceEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async createEstablishmentService(
    createServiceDto: CreateDentistServiceDto,
    establishmentId: string,
  ): Promise<ResponseApi<DentistServiceEntity>> {
    try {
      const establishmentService = this.serviceRepository.create({
        ...createServiceDto,
        establishment: { id: establishmentId },
      });
      const data = await this.serviceRepository.save(establishmentService);
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e);
    }
  }

  async deleteEstablishmentServices(
    establishmentId: string,
    deleteEstablishmentServicesDto: DeleteDentistServiceDto,
  ): Promise<ResponseApi<Array<DentistServiceEntity>>> {
    try {
      const { idServices } = deleteEstablishmentServicesDto;
      const entities = await this.serviceRepository.find({
        where: { id: In(idServices), establishment: { id: establishmentId } },
      });

      const response = await this.serviceRepository.remove(entities);

      return new ResponseApi(response, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e);
    }
  }

  async getAllEstablishmentServices(
    establishmentId: string,
  ): Promise<ResponseApi<Array<DentistServiceEntity>>> {
    try {
      const data = await this.serviceRepository.find({
        where: { establishment: { id: establishmentId } },
        relations: { establishment: { dentist: true } },
      });
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e);
    }
  }

  async getOneEstablishmentServices(
    establishmentId: string,
    serviceId: string,
  ): Promise<ResponseApi<DentistServiceEntity>> {
    try {
      const data = await this.serviceRepository.findOne({
        where: { id: serviceId, establishment: { id: establishmentId } },
        relations: { establishment: { dentist: true } },
      });
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e);
    }
  }

  async updateEstablishmentServices(
    establishmentId: string,
    serviceId: string,
    updateEstablishmentDto: UpdateDentistServiceDto,
  ): Promise<ResponseApi<UpdateResult>> {
    try {
      const data = await this.serviceRepository.update(
        { id: serviceId, establishment: { id: establishmentId } },
        updateEstablishmentDto,
      );
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e);
    }
  }
}
