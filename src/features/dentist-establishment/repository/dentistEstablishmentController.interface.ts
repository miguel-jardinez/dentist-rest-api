import { ResponseApi } from '@utils/ResponseApi';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { RequestUserData } from '@utils/RequestUserData';
import { CreateDentistEstablishmentDto } from '@features/dentist-establishment/dto/create-dentist-establishment.dto';
import { UpdateDentistEstablishmentDto } from '@features/dentist-establishment/dto/update-dentist-establishment.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface DentistEstablishmentControllerInterface {
  createDentistEstablishment: (
    request: RequestUserData,
    createDentistEstablishmentDto: CreateDentistEstablishmentDto,
  ) => Promise<ResponseApi<DentistEstablishmentEntity>>;

  getOneDentistEstablishment: (
    request: RequestUserData,
    establishmentId: string,
  ) => Promise<ResponseApi<DentistEstablishmentEntity>>;

  getAllDentistEstablishment: (
    request: RequestUserData,
  ) => Promise<ResponseApi<DentistEstablishmentEntity[]>>;

  deleteDentistEstablishment: (
    request: RequestUserData,
    establishmentId: string,
  ) => Promise<ResponseApi<DeleteResult>>;

  updateDentistEstablishment: (
    request: RequestUserData,
    establishmentId: string,
    updateDentistEstablishmentDto: UpdateDentistEstablishmentDto,
  ) => Promise<ResponseApi<UpdateResult>>;
}
