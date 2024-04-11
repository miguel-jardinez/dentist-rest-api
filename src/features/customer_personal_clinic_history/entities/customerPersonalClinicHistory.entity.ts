import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerPersonalClinicHistoryModelEntity } from '@features/customer_personal_clinic_history/entities/customerPersonalClinicHistoryModelEntity';

@Entity('customer_personal_clinic_history')
export class CustomerPersonalClinicHistory
  implements CustomerPersonalClinicHistoryModelEntity
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
