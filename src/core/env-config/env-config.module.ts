import { Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EnvConfigService, ConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
