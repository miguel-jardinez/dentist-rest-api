import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { ErrorService } from '../utils/ErrorService';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    HttpModule,
    ProfileModule,
    TypeOrmModule.forFeature([AddressEntity]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService, ConfigService, ErrorService],
})
export class AddressesModule {}
