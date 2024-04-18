import { ResponseApi } from '@utils/ResponseApi';
import { AppointmentVitalSignEntity } from '@features/appointment-vital-signs/entities/appointment-vital-sign.entity';
import { DeleteResult } from 'typeorm';
import { UpdateAppointmentVitalSignDto } from '@features/appointment-vital-signs/dto/update-appointment-vital-sign.dto';
import { CreateAppointmentVitalSignDto } from '@features/appointment-vital-signs/dto/create-appointment-vital-sign.dto';

export class AppointmentVitalSignServiceInterface {
  createVitalSignsAppointment: (
    appointmentId: string,
    createVitalSignsDto: CreateAppointmentVitalSignDto,
  ) => Promise<ResponseApi<AppointmentVitalSignEntity>>;

  deleteVitalSignsAppointment: (
    appointmentId: string,
    vitalSignsId: string,
  ) => Promise<ResponseApi<DeleteResult>>;

  updateVitalSignsAppointment: (
    vitalSignsId: string,
    appointmentId: string,
    updateVitalSigns: UpdateAppointmentVitalSignDto,
  ) => Promise<ResponseApi<DeleteResult>>;

  getOneVitalSignsAppointment: (
    appointmentId: string,
    vitalSignsId: string,
  ) => Promise<ResponseApi<DeleteResult>>;
}
