import { Injectable } from '@nestjs/common';
import { CreateDentistProfileDto } from './dto/create-dentist-profile.dto';
import { UpdateDentistProfileDto } from './dto/update-dentist-profile.dto';
import { DentistProfileEntityDtoInterface } from '@features/dentist-profile/repository/dentistProfileEntityService.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ErrorService } from '@utils/ErrorService';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DentistProfileService implements DentistProfileEntityDtoInterface {
  constructor(
    private readonly errorService: ErrorService,
    @InjectRepository(DentistProfileEntity)
    private readonly dentistRepository: Repository<DentistProfileEntity>,
  ) {}

  async create(
    createDentistProfileDto: CreateDentistProfileDto,
    userId: string,
  ): Promise<ResponseApi<DentistProfileEntity>> {
    try {
      const profileCreated = this.dentistRepository.create(
        createDentistProfileDto,
      );
      const profile = await this.dentistRepository.save({
        ...profileCreated,
        user: { id: userId },
      });

      return new ResponseApi(profile, true, Date());
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code);
    }
  }

  async findAll(): Promise<ResponseApi<DentistProfileEntity[]>> {
    try {
      const profileList = await this.dentistRepository.find({
        relations: { user: true },
      });
      return new ResponseApi(profileList, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }

  async findOne(id: string): Promise<ResponseApi<DentistProfileEntity>> {
    try {
      const profile = await this.dentistRepository.findOne({
        where: { id },
        relations: { user: true },
      });
      return new ResponseApi(profile, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }

  async remove(id: string): Promise<ResponseApi<DeleteResult>> {
    try {
      const profile = await this.dentistRepository.delete({ id });
      return new ResponseApi(profile, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }

  async update(id: string, updateProfileDto: UpdateDentistProfileDto) {
    try {
      const profile = await this.dentistRepository.update(
        { id },
        updateProfileDto,
      );
      return new ResponseApi(profile, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }
}
