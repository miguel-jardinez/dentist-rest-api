import { ResponseApi } from '@utils/ResponseApi';
import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';
import { CreateDentistEstablishmentAddressDto } from '@features/dentist-establishment-address/dto/create-dentist-establishment-address.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateDentistEstablishmentAddressDto } from '@features/dentist-establishment-address/dto/update-dentist-establishment-address.dto';

export interface DentistEstablishmentAddressServiceInterface {
  getEstablishmentAddress: (
    establishmentId: string,
  ) => Promise<ResponseApi<EstablishmentAddressEntity>>;
  createEstablishmentDentistAddress: (
    createEstablishmentDto: CreateDentistEstablishmentAddressDto,
  ) => Promise<ResponseApi<EstablishmentAddressEntity>>;
  updateEstablishmentDentistAddress: (
    establishmentAddressId: string,
    updateEstablishmentAddress: UpdateDentistEstablishmentAddressDto,
  ) => Promise<ResponseApi<UpdateResult>>;
  deleteEstablishmentDentistAddress: (
    establishmentId: string,
    establishmentAddressId: string,
  ) => Promise<ResponseApi<DeleteResult>>;
}
