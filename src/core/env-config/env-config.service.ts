import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfigServiceInterface } from './repository/EnvConfigServiceInterface';

@Injectable()
export class EnvConfigService implements EnvConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  getBoolean(variable: string): boolean {
    return this.configService.get<boolean>(variable);
  }

  getNumber(variable: string): number {
    return this.configService.get<number>(variable);
  }

  getString(variable: string): string {
    return this.configService.get<string>(variable);
  }
}
