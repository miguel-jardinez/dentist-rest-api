import { PartialType } from '@nestjs/swagger';
import { CreateCustomerFamiliarClinicHistoryDto } from './create-customer_familiar_clinic_history.dto';

export class UpdateCustomerFamiliarClinicHistoryDto extends PartialType(CreateCustomerFamiliarClinicHistoryDto) {}
