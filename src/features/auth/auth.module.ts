import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@features/users/users.module';
import { AuthController } from '@features/auth/auth.controller';
import { AuthService } from '@features/auth/auth.service';
import { LocalStrategy } from '@features/auth/strategies/local.strategy';
import { JwtStrategy } from '@features/auth/strategies/jwt.strategy';
import { ErrorService } from '@utils/ErrorService';
import { CognitoService } from '../../aws/cognito/cognito.service';
import { EnvConfigModule } from '@core/env-config/env-config.module';
import { EnvConfigService } from '@core/env-config/env-config.service';
import { SecretHashService } from '../../aws/secret-hash/secret-hash.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    EnvConfigModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (envConfigService: EnvConfigService) => ({
        secret: envConfigService.getString('API_JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ErrorService,
    CognitoService,
    SecretHashService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
