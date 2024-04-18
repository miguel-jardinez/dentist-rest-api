import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';

export class AppointmentVitalSignDtoInterface {
  bloodPressure: string;
  oxygenationSaturation: string;
  bodyTemperature: string;
  respiratoryRate: string;
  appointmentId: string;
}
