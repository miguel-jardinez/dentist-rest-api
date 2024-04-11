import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorService } from '@utils/ErrorService';
import { DentistServiceEntity } from '@features/dentist-services/entities/dentist-service.entity';

@Injectable()
export class DentistServicesService {
  constructor(
    @InjectRepository(DentistServiceEntity)
    private readonly serviceRepository: Repository<DentistServiceEntity>,
    private readonly errorService: ErrorService,
  ) {}
}
