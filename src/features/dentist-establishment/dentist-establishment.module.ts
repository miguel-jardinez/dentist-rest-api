import { Module } from '@nestjs/common';
import { DentistEstablishmentService } from './dentist-establishment.service';
import { DentistEstablishmentController } from './dentist-establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from '@utils/ErrorService';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DentistEstablishmentEntity])],
  controllers: [DentistEstablishmentController],
  providers: [DentistEstablishmentService, ErrorService],
  exports: [DentistEstablishmentService],
})
export class DentistEstablishmentModule {}
