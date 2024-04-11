import { Module } from '@nestjs/common';
import { VitalSignsService } from './vital_signs.service';
import { VitalSignsController } from './vital_signs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSignEntity } from '@features/vital_signs/entities/vital_sign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VitalSignEntity])],
  controllers: [VitalSignsController],
  providers: [VitalSignsService],
})
export class VitalSignsModule {}
