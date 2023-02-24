import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDbConfigService } from './configuration/PostgressDbConfigService';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { DentistServicesModule } from './dentist-services/dentist-services.module';
import { AddressesModule } from './addresses/addresses.module';
import { PatientFormModule } from './patient-form/patient-form.module';

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
    ProfileModule,
    AuthModule,
    DentistServicesModule,
    AddressesModule,
    PatientFormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
