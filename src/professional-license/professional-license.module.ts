import { Module } from '@nestjs/common';
import { ProfessionalLicenseService } from './professional-license.service';
import { ProfessionalLicenseController } from './professional-license.controller';
import { ErrorService } from '../utils/ErrorService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalLicenseEntity } from './entities/professional-license.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessionalLicenseEntity]),
    HttpModule,
    ConfigModule,
    ProfileModule,
  ],
  controllers: [ProfessionalLicenseController],
  providers: [ProfessionalLicenseService, ErrorService],
})
export class ProfessionalLicenseModule {}
