import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentAddressController } from '@features/establishment_address/establishment_address.controller';
import { EstablishmentAddressService } from '@features/establishment_address/establishment_address.service';
import { EstablishmentAddressEntity } from '@features/establishment_address/entities/establishment_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstablishmentAddressEntity])],
  controllers: [EstablishmentAddressController],
  providers: [EstablishmentAddressService],
  exports: [EstablishmentAddressService],
})
export class DentistAddressModule {}
