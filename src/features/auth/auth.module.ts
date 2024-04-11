import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@features/users/users.module';
import { AuthController } from '@features/auth/auth.controller';
import { AuthService } from '@features/auth/auth.service';
import { LocalStrategy } from '@features/auth/strategies/local.strategy';
import { JwtStrategy } from '@features/auth/strategies/jwt.strategy';
import { ErrorService } from '@utils/ErrorService';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('API_JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ErrorService],
  exports: [AuthService],
})
export class AuthModule {}
