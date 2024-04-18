import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentVitalSignDto } from './create-appointment-vital-sign.dto';

export class UpdateAppointmentVitalSignDto extends PartialType(CreateAppointmentVitalSignDto) {}
