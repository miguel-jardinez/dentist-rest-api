import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DentistProfileController } from '@features/dentist-profile/dentist-profile.controller';
import { DentistProfileService } from '@features/dentist-profile/dentist-profile.service';
import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';
import { ErrorService } from '@utils/ErrorService';

@Module({
  imports: [TypeOrmModule.forFeature([DentistProfileEntity])],
  controllers: [DentistProfileController],
  providers: [DentistProfileService, ErrorService],
  exports: [DentistProfileService],
})
export class DentistProfileModule {}
