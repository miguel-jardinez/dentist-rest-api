import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerFamiliarClinicHistoryModelEntity } from '@features/customer_familiar_clinic_history/entities/customerFamiliarClinicHistoryModelEntity';

@Entity('customer_familiar_clinic_history')
export class CustomerFamiliarClinicHistory
  implements CustomerFamiliarClinicHistoryModelEntity
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
