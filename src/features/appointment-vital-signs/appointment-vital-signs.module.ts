import { Module } from '@nestjs/common';
import { AppointmentVitalSignsService } from './appointment-vital-signs.service';
import { AppointmentVitalSignsController } from './appointment-vital-signs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentVitalSignEntity } from '@features/appointment-vital-signs/entities/appointment-vital-sign.entity';
import { ErrorService } from '@utils/ErrorService';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentVitalSignEntity])],
  controllers: [AppointmentVitalSignsController],
  providers: [AppointmentVitalSignsService, ErrorService],
  exports: [AppointmentVitalSignsService]
})
export class AppointmentVitalSignsModule {}
