import { Injectable } from '@nestjs/common';
import { CreateDentistEstablishmentDto } from './dto/create-dentist-establishment.dto';
import { UpdateDentistEstablishmentDto } from './dto/update-dentist-establishment.dto';
import { DentistEstablishmentServiceInterface } from '@features/dentist-establishment/repository/dentistEstablishmentService.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorService } from '@utils/ErrorService';

@Injectable()
export class DentistEstablishmentService
  implements DentistEstablishmentServiceInterface
{
  constructor(
    @InjectRepository(DentistEstablishmentEntity)
    private readonly dentistEstablishmentEntity: Repository<DentistEstablishmentEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async createDentistEstablishment(
    dentistProfileId: string,
    createDentistEstablishmentDto: CreateDentistEstablishmentDto,
  ): Promise<ResponseApi<DentistEstablishmentEntity>> {
    try {
      const establishment = this.dentistEstablishmentEntity.create({
        ...createDentistEstablishmentDto,
        dentist: { id: dentistProfileId },
      });
      const establishmentEntity = await this.dentistEstablishmentEntity.save(
        establishment,
      );

      return new ResponseApi(establishmentEntity, true, Date());
    } catch (e: any) {
      console.log(e.message);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async deleteDentistEstablishment(
    dentistProfileId: string,
    establishmentId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    try {
      const deleteEntity = await this.dentistEstablishmentEntity.delete({
        id: establishmentId,
        dentist: { id: dentistProfileId },
      });

      return new ResponseApi(deleteEntity, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getAllDentistEstablishment(
    dentistProfileId: string,
  ): Promise<ResponseApi<DentistEstablishmentEntity[]>> {
    try {
      const establishmentEntities = await this.dentistEstablishmentEntity.find({
        where: { dentist: { id: dentistProfileId } },
        relations: { dentist: true, address: true },
        relationLoadStrategy: 'query',
      });

      return new ResponseApi(establishmentEntities, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getOneDentistEstablishment(
    dentistProfileId: string,
    establishmentId: string,
  ): Promise<ResponseApi<DentistEstablishmentEntity>> {
    try {
      const establishmentEntity = await this.dentistEstablishmentEntity.findOne(
        {
          where: { id: establishmentId, dentist: { id: dentistProfileId } },
        },
      );

      return new ResponseApi(establishmentEntity, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async updateDentistEstablishment(
    dentistProfileId: string,
    establishmentId: string,
    updateDentistEstablishmentDto: UpdateDentistEstablishmentDto,
  ): Promise<ResponseApi<UpdateResult>> {
    try {
      const updatedEntity = await this.dentistEstablishmentEntity.update(
        { id: establishmentId, dentist: { id: dentistProfileId } },
        updateDentistEstablishmentDto,
      );

      return new ResponseApi(updatedEntity, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
