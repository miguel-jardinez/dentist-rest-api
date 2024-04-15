import { Module } from '@nestjs/common';
import { ErrorService } from '@utils/ErrorService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentistLicenseEntity } from '@features/dentist-license/entities/dentist-license.entity';
import { HttpModule } from '@nestjs/axios';
import { EnvConfigModule } from '@core/env-config/env-config.module';
import { DentistLicenseController } from '@features/dentist-license/dentist-license.controller';
import { DentistLicenseService } from '@features/dentist-license/dentist-license.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DentistLicenseEntity]),
    HttpModule,
    EnvConfigModule,
  ],
  controllers: [DentistLicenseController],
  providers: [DentistLicenseService, ErrorService],
  exports: [DentistLicenseService],
})
export class DentistLicenseModule {}
