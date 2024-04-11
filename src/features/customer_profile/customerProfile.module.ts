import { Module } from '@nestjs/common';
import { CustomerProfileService } from './customerProfile.service';
import { CustomerProfileController } from './customerProfile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerProfileEntity } from './entities/customerProfile.entity';
import { ErrorService } from '@utils/ErrorService';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfileEntity])],
  controllers: [CustomerProfileController],
  providers: [CustomerProfileService, ErrorService],
  exports: [CustomerProfileService],
})
export class CustomerProfileModule {}
