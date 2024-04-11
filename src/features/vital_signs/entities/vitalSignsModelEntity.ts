import { AppointmentEntity } from '@features/appointment/entities/appointment.entity';

export interface VitalSignsModelEntity {
  id: string;
  bloodPressure: string;
  oxygenationSaturation: string;
  bodyTemperature: string;
  respiratoryRate: string;
  appointment: AppointmentEntity;
  createdAt: string;
  updatedAt: string;
}
