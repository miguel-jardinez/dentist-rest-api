import { Injectable } from '@nestjs/common';
import { UpdateAppointmentVitalSignDto } from './dto/update-appointment-vital-sign.dto';
import { AppointmentVitalSignServiceInterface } from '@features/appointment-vital-signs/repository/appointment-vital-sign-service.interface';

import { ResponseApi } from '@utils/ResponseApi';
import { AppointmentVitalSignEntity } from '@features/appointment-vital-signs/entities/appointment-vital-sign.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorService } from '@utils/ErrorService';
import { CreateAppointmentVitalSignDto } from '@features/appointment-vital-signs/dto/create-appointment-vital-sign.dto';

@Injectable()
export class AppointmentVitalSignsService
  implements AppointmentVitalSignServiceInterface
{
  constructor(
    @InjectRepository(AppointmentVitalSignEntity)
    private readonly appointmentVitalSigns: Repository<AppointmentVitalSignEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async createVitalSignsAppointment(
    appointmentId: string,
    createVitalSignsDto: CreateAppointmentVitalSignDto,
  ): Promise<ResponseApi<AppointmentVitalSignEntity>> {
    try {
      return Promise.resolve(undefined);
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async deleteVitalSignsAppointment(
    appointmentId: string,
    vitalSignsId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    try {
      return Promise.resolve(undefined);
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async getOneVitalSignsAppointment(
    appointmentId: string,
    vitalSignsId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    try {
      return Promise.resolve(undefined);
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async updateVitalSignsAppointment(
    vitalSignsId: string,
    appointmentId: string,
    updateVitalSigns: UpdateAppointmentVitalSignDto,
  ): Promise<ResponseApi<DeleteResult>> {
    try {
      return Promise.resolve(undefined);
    } catch (e: any) {
      console.log(e);
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
