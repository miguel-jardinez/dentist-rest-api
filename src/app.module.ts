import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerProfileModule } from '@features/customer_profile/customerProfile.module';
import { UsersModule } from '@features/users/users.module';
import { AuthModule } from '@features/auth/auth.module';
import { DentistServicesModule } from '@features/dentist-services/dentist-services.module';
import { DentistProfileModule } from '@features/dentist-profile/dentist-profile.module';
import { DentistAddressModule } from '@features/dentist-establishment-address/dentist-establishment-address.module';
import { WorkingScheduleModule } from '@features/working_schedule/working_schedule.module';
import { CustomerEmergencyContactModule } from '@features/customer_emergency_contact/customerEmergencyContact.module';
import { CustomerPersonalClinicHistoryModule } from '@features/customer_personal_clinic_history/customerPersonalClinicHistory.module';
import { CustomerFamiliarClinicHistoryModule } from '@features/customer_familiar_clinic_history/customerFamiliarClinicHistory.module';
import { AppointmentModule } from '@features/appointment/appointment.module';
import { PaymentMethodsModule } from '@features/payment_methods/payment_methods.module';
import { CustomerAddressModule } from '@features/customer_address/customer-address.module';
import { MapBoxModule } from '@features/map-box/map-box.module';
import { DentistLicenseModule } from '@features/dentist-license/dentist-license.module';
import { PostgresDbConfigService } from '@configuration/PostgressDbConfigService';
import { EnvConfigModule } from '@core/env-config/env-config.module';
import { DentistEstablishmentModule } from '@features/dentist-establishment/dentist-establishment.module';
import { StatesModule } from '@seeder/states/states.module';
import { AppointmentVitalSignsModule } from '@features/appointment-vital-signs/appointment-vital-signs.module';
import { SpecialtiesModule } from '@seeder/specialties/specialties.module';
import { CognitoService } from './aws/cognito/cognito.service';
import { S3Service } from './aws/s3/s3.service';
import { SecretHashService } from './aws/secret-hash/secret-hash.service';
import { TeethModule } from '@seeder/teeths/teeth.module';

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
    PaymentMethodsModule,
    AppointmentModule,
    CustomerAddressModule,
    MapBoxModule,
    EnvConfigModule,
    DentistLicenseModule,
    DentistEstablishmentModule,
    StatesModule,
    SpecialtiesModule,
    AppointmentVitalSignsModule,
    TeethModule,
  ],
  controllers: [],
  providers: [CognitoService, S3Service, SecretHashService],
})
export class AppModule {}
