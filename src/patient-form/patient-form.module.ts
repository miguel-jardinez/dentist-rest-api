import { Module } from '@nestjs/common';
import { PatientFormService } from './patient-form.service';
import { PatientFormController } from './patient-form.controller';
import { ErrorService } from '../utils/ErrorService';
import { ProfileModule } from '../profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientPersonalFormEntity } from './entities/patient-personal-form.entity';
import { PatientRelativesFormEntity } from './entities/patient-relatives-form.entity';

@Module({
  imports: [
    ProfileModule,
    TypeOrmModule.forFeature([
      PatientPersonalFormEntity,
      PatientRelativesFormEntity,
    ]),
  ],
  controllers: [PatientFormController],
  providers: [PatientFormService, ErrorService],
})
export class PatientFormModule {}
