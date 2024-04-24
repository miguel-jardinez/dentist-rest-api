import { Injectable } from '@nestjs/common';

import { UpdateDentistEstablishmentAddressDto } from './dto/update-dentist-establishment-address.dto';
import { CreateDentistEstablishmentAddressDto } from '@features/dentist-establishment-address/dto/create-dentist-establishment-address.dto';
import { DentistEstablishmentAddressServiceInterface } from '@features/dentist-establishment-address/repository/dentist-establishment-address.service.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorService } from '@utils/ErrorService';

@Injectable()
export class EstablishmentAddressService
  implements DentistEstablishmentAddressServiceInterface
{
  constructor(
    @InjectRepository(EstablishmentAddressEntity)
    private readonly establishmentAddressEntity: Repository<EstablishmentAddressEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async createEstablishmentDentistAddress(
    createEstablishmentDto: CreateDentistEstablishmentAddressDto,
  ): Promise<ResponseApi<EstablishmentAddressEntity>> {
    try {
      const coordinatesString = `(${createEstablishmentDto.coordinates[0]}, ${createEstablishmentDto.coordinates[1]})`;

      const addressEstablishment = this.establishmentAddressEntity.create({
        ...createEstablishmentDto,
        coordinates: coordinatesString,
        establishment: { id: createEstablishmentDto.establishmentId },
        state: { id: createEstablishmentDto.stateId },
      });
      const data = await this.establishmentAddressEntity.save(
        addressEstablishment,
      );
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async deleteEstablishmentDentistAddress(
    establishmentId: string,
    establishmentAddressId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    try {
      const addressEstablishment = await this.establishmentAddressEntity.delete(
        {
          id: establishmentAddressId,
          establishment: { id: establishmentId },
        },
      );
      return new ResponseApi(addressEstablishment, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getEstablishmentAddress(
    establishmentId: string,
  ): Promise<ResponseApi<EstablishmentAddressEntity>> {
    try {
      const addressEstablishment =
        await this.establishmentAddressEntity.findOne({
          where: {
            establishment: { id: establishmentId },
          },
          relations: { state: true, establishment: true },
        });
      return new ResponseApi(addressEstablishment, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async updateEstablishmentDentistAddress(
    establishmentAddressId: string,
    updateEstablishmentAddressDto: UpdateDentistEstablishmentAddressDto,
  ): Promise<ResponseApi<UpdateResult>> {
    try {
      const { establishmentId, coordinates, ...dataDto } =
        updateEstablishmentAddressDto;
      const coordinatesString = `(${coordinates[0]}, ${coordinates[1]})`;

      const addressEstablishment = await this.establishmentAddressEntity.update(
        {
          id: establishmentAddressId,
          establishment: { id: establishmentId },
        },
        { ...dataDto, coordinates: coordinatesString },
      );
      return new ResponseApi(addressEstablishment, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
