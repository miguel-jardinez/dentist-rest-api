import { Injectable } from '@nestjs/common';
import { CreateDentistServiceDto } from './dto/services/create-dentist-service.dto';
import { UpdateDentistServiceDto } from './dto/services/update-dentist-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DentistServiceEntity } from './entities/dentist-service.entity';
import { AmountEntityEntity } from './entities/amount-entity.entity';
import { ErrorService } from '../utils/ErrorService';

@Injectable()
export class DentistServicesService {
  constructor(
    @InjectRepository(DentistServiceEntity)
    private readonly serviceRepository: Repository<DentistServiceEntity>,
    @InjectRepository(AmountEntityEntity)
    private readonly amountRepository: Repository<AmountEntityEntity>,
    private readonly errorService: ErrorService,
  ) {}
  async create(
    createDentistServiceDto: CreateDentistServiceDto,
    id: string,
  ): Promise<string> {
    try {
      const dataService = {
        name: createDentistServiceDto.name,
        description: createDentistServiceDto.description,
      };
      const serviceModel = this.serviceRepository.create(dataService);
      const currencyModel = this.amountRepository.create(
        createDentistServiceDto.amount,
      );

      const service = await this.serviceRepository.save({
        ...serviceModel,
        user: { id },
      });

      await this.amountRepository.save({
        ...currencyModel,
        service: { id: service.id },
      });

      return `Service ${service.name} was created successfully`;
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async findAll(id: string): Promise<DentistServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        where: { user: { id } },
        relations: { amount: true },
      });
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async findOne(id: string): Promise<DentistServiceEntity> {
    try {
      return await this.serviceRepository.findOneOrFail({
        where: { id },
        relations: { amount: true },
      });
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async update(
    serviceId: string,
    userId: string,
    updateDentistServiceDto: UpdateDentistServiceDto,
  ): Promise<string> {
    try {
      const dataService = {
        name: updateDentistServiceDto.name,
        description: updateDentistServiceDto.description,
      };

      await this.serviceRepository.update(
        { id: serviceId, user: { id: userId } },
        dataService,
      );

      await this.amountRepository.update(
        { service: { id: serviceId } },
        updateDentistServiceDto.amount,
      );

      return `Service ${serviceId} was updated correctly`;
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
    return `This action updates a #${serviceId} dentistService ${updateDentistServiceDto}`;
  }

  async remove(serviceId: string, userId: string): Promise<string> {
    try {
      const deleted = await this.serviceRepository.delete({
        id: serviceId,
        user: { id: userId },
      });

      if (deleted.affected === 0) {
        this.errorService.errorHandling('404');
      }

      return `Service ${serviceId} was deleted successfully`;
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }
}
