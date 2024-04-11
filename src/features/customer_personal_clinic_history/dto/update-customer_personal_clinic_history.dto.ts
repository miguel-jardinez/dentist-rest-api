import { PartialType } from '@nestjs/swagger';
import { CreateCustomerPersonalClinicHistoryDto } from './create-customer_personal_clinic_history.dto';

export class UpdateCustomerPersonalClinicHistoryDto extends PartialType(CreateCustomerPersonalClinicHistoryDto) {}
