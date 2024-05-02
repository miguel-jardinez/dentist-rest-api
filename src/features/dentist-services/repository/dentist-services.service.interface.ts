import { CreateDentistServiceDto } from '@features/dentist-services/dto/services/create-dentist-service.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { DentistServiceEntity } from '@features/dentist-services/entities/dentist-service.entity';
import { UpdateDentistServiceDto } from '@features/dentist-services/dto/services/update-dentist-service.dto';
import { DeleteDentistServiceDto } from '@features/dentist-services/dto/services/delete-dentist-service.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface DentistServicesServiceInterface {
  createEstablishmentService: (
    createServiceEntity: CreateDentistServiceDto,
    establishmentId: string,
  ) => Promise<ResponseApi<DentistServiceEntity>>;
  getAllEstablishmentServices: (
    establishmentId: string,
  ) => Promise<ResponseApi<Array<DentistServiceEntity>>>;
  getOneEstablishmentServices: (
    establishmentId: string,
    serviceId: string,
  ) => Promise<ResponseApi<DentistServiceEntity>>;
  updateEstablishmentServices: (
    establishmentId: string,
    serviceId: string,
    updateEstablishmentDto: UpdateDentistServiceDto,
  ) => Promise<ResponseApi<UpdateResult>>;
  deleteEstablishmentServices: (
    establishmentId: string,
    deleteEstablishmentServices: DeleteDentistServiceDto,
  ) => Promise<ResponseApi<Array<DentistServiceEntity>>>;
}
