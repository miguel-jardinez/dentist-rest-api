import { Module } from '@nestjs/common';
import { CustomerAddressService } from './customer-address.service';
import { CustomerAddressController } from './customer-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressEntity } from '@features/customer_address/entities/customer-address.entity';
import { ErrorService } from '@utils/ErrorService';

@Module({
  controllers: [CustomerAddressController],
  exports: [CustomerAddressService],
  imports: [TypeOrmModule.forFeature([CustomerAddressEntity])],
  providers: [CustomerAddressService, ErrorService],
})
export class CustomerAddressModule {}
