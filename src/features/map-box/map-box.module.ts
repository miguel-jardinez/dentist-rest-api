import { Module } from '@nestjs/common';
import { MapBoxService } from './map-box.service';
import { MapBoxController } from './map-box.controller';
import { ErrorService } from '@utils/ErrorService';
import { EnvConfigModule } from '@core/env-config/env-config.module';

@Module({
  controllers: [MapBoxController],
  providers: [MapBoxService, ErrorService],
  imports: [EnvConfigModule],
  exports: [MapBoxService],
})
export class MapBoxModule {}
