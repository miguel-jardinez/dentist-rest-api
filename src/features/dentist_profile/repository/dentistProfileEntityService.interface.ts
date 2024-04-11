import { ResponseApi } from '@utils/ResponseApi';
import { DentistProfileEntity } from '@features/dentist_profile/entities/dentist_profile.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateDentistProfileDto } from '@features/dentist_profile/dto/create-dentist_profile.dto';
import { UpdateDentistProfileDto } from '@features/dentist_profile/dto/update-dentist_profile.dto';

export interface DentistProfileEntityDtoInterface {
  create: (
    createDentistProfileDto: CreateDentistProfileDto,
    userId: string,
  ) => Promise<ResponseApi<DentistProfileEntity>>;
  findAll: () => Promise<ResponseApi<DentistProfileEntity[]>>;
  findOne: (id: string) => Promise<ResponseApi<DentistProfileEntity>>;
  update: (
    id: string,
    updateProfileDto: UpdateDentistProfileDto,
  ) => Promise<ResponseApi<UpdateResult>>;
  remove: (id: string) => Promise<ResponseApi<DeleteResult>>;
}
