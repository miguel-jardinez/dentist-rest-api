import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDbConfigService } from './configuration/PostgressDbConfigService';
import { CustomerProfileModule } from '@features/customer_profile/customerProfile.module';
import { UsersModule } from '@features/users/users.module';
import { AuthModule } from '@features/auth/auth.module';
import { DentistServicesModule } from '@features/dentist-services/dentist-services.module';
import { DentistProfileModule } from '@features/dentist_profile/dentist_profile.module';
import { DentistAddressModule } from '@features/establishment_address/establishment_address.module';
import { WorkingScheduleModule } from '@features/working_schedule/working_schedule.module';
import { CustomerEmergencyContactModule } from '@features/customer_emergency_contact/customerEmergencyContact.module';
import { CustomerPersonalClinicHistoryModule } from '@features/customer_personal_clinic_history/customerPersonalClinicHistory.module';
import { CustomerFamiliarClinicHistoryModule } from '@features/customer_familiar_clinic_history/customerFamiliarClinicHistory.module';
import { AppointmentModule } from '@features/appointment/appointment.module';
import { VitalSignsModule } from '@features/vital_signs/vital_signs.module';
import { PaymentMethodsModule } from '@features/payment_methods/payment_methods.module';
import { CustomerAddressModule } from '@features/customer_address/customer-address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresDbConfigService,
      inject: [PostgresDbConfigService],
    }),
    UsersModule,
    CustomerProfileModule,
    AuthModule,
    DentistServicesModule,
    DentistProfileModule,
    DentistAddressModule,
    WorkingScheduleModule,
    CustomerEmergencyContactModule,
    CustomerPersonalClinicHistoryModule,
    CustomerFamiliarClinicHistoryModule,
    AppointmentModule,
    VitalSignsModule,
    PaymentMethodsModule,
    AppointmentModule,
    CustomerAddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
