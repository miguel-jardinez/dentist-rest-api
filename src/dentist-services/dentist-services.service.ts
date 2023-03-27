import { Injectable, Logger } from '@nestjs/common';
import { CreateDentistServiceDto } from './dto/services/create-dentist-service.dto';
import { UpdateDentistServiceDto } from './dto/services/update-dentist-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DentistServiceEntity } from './entities/dentist-service.entity';
import { AmountEntityEntity } from './entities/amount-entity.entity';
import { ErrorService } from '../utils/ErrorService';
import { ProfileService } from '../profile/profile.service';
import { Usertype } from '../utils/types/User';

@Injectable()
export class DentistServicesService {
  private readonly logger = new Logger(DentistServiceEntity.name);
  constructor(
    @InjectRepository(DentistServiceEntity)
    private readonly serviceRepository: Repository<DentistServiceEntity>,
    @InjectRepository(AmountEntityEntity)
    private readonly amountRepository: Repository<AmountEntityEntity>,
    private readonly errorService: ErrorService,
    private readonly profileService: ProfileService,
  ) {}
  async create(
    createDentistServiceDto: CreateDentistServiceDto,
    user: Usertype,
  ): Promise<DentistServiceEntity> {
    try {
      const profile = await this.profileService.findByUserId(user);

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
        profile: { id: profile.id },
      });

      await this.amountRepository.save({
        ...currencyModel,
        service: { id: service.id },
      });

      this.logger.log(`Service ${service.name} was created successfully`);

      return service;
    } catch (e) {
      this.errorService.errorHandling('404', e.message);
    }
  }

  async findAll(id: string): Promise<DentistServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        where: { profile: { user: { id } } },
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
        { id: serviceId, profile: { user: { id: userId } } },
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
  }

  async remove(serviceId: string, userId: string): Promise<string> {
    try {
      const deleted = await this.serviceRepository.delete({
        id: serviceId,
        profile: { user: { id: userId } },
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
