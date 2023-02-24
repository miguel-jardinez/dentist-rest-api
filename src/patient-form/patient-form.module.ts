import { Module } from '@nestjs/common';
import { PatientFormService } from './patient-form.service';
import { PatientFormController } from './patient-form.controller';

@Module({
  controllers: [PatientFormController],
  providers: [PatientFormService],
})
export class PatientFormModule {}
