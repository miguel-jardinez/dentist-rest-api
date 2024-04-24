import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentAddressController } from '@features/dentist-establishment-address/dentist-establishment-address.controller';
import { EstablishmentAddressService } from '@features/dentist-establishment-address/dentist-establishment-address.service';
import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';
import { ErrorService } from '@utils/ErrorService';

@Module({
  imports: [TypeOrmModule.forFeature([EstablishmentAddressEntity])],
  controllers: [EstablishmentAddressController],
  providers: [EstablishmentAddressService, ErrorService],
  exports: [EstablishmentAddressService],
})
export class DentistAddressModule {}
