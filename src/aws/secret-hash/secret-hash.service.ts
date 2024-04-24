import { Injectable } from '@nestjs/common';
import { SecretHashServiceInterface } from './secret-hash.service-interface';
import { createHmac } from 'crypto';
import { EnvConfigService } from '@core/env-config/env-config.service';

@Injectable()
export class SecretHashService implements SecretHashServiceInterface {
  constructor(private readonly envConfigService: EnvConfigService) {}

  awsHashSecret(email: string): string {
    return createHmac(
      'SHA256',
      this.envConfigService.getString('AWS_CLIENT_SECRET'),
    )
      .update(email + this.envConfigService.getString('AWS_CLIENT_ID'))
      .digest('base64');
  }
}
