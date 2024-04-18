import { CreateDentistEstablishmentDto } from '@features/dentist-establishment/dto/create-dentist-establishment.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { UpdateDentistEstablishmentDto } from '@features/dentist-establishment/dto/update-dentist-establishment.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface DentistEstablishmentServiceInterface {
  createDentistEstablishment: (
    dentistProfileId: string,
    createDentistEstablishmentDto: CreateDentistEstablishmentDto,
  ) => Promise<ResponseApi<DentistEstablishmentEntity>>;

  getOneDentistEstablishment: (
    dentistProfileId: string,
    establishmentId: string,
  ) => Promise<ResponseApi<DentistEstablishmentEntity>>;

  getAllDentistEstablishment: (
    dentistProfileId: string,
  ) => Promise<ResponseApi<Array<DentistEstablishmentEntity>>>;

  deleteDentistEstablishment: (
    dentistProfileId: string,
    establishmentId: string,
  ) => Promise<ResponseApi<DeleteResult>>;

  updateDentistEstablishment: (
    dentistProfileId: string,
    establishmentId: string,
    updateDentistEstablishmentDto: UpdateDentistEstablishmentDto,
  ) => Promise<ResponseApi<UpdateResult>>;
}
