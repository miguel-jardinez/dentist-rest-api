import {
  AppointmentVitalSignDtoInterface
} from '@features/appointment-vital-signs/repository/appointment-vital-sign-dto.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentVitalSignDto implements AppointmentVitalSignDtoInterface {
  @IsString()
  @IsNotEmpty()
  appointmentId: string;

  @IsString()
  @IsNotEmpty()
  bloodPressure: string;

  @IsString()
  @IsNotEmpty()
  bodyTemperature: string;

  @IsString()
  @IsNotEmpty()
  oxygenationSaturation: string;

  @IsString()
  @IsNotEmpty()
  respiratoryRate: string;
}
