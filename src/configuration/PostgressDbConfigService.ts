import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresDbConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const dbName = this.configService.get<string>('POSTGRES_DATABASE');
    const username = this.configService.get<string>('POSTGRES_USER');
    const password = this.configService.get<string>('POSTGRES_PASSWORD');
    const host = this.configService.get<string>('POSTGRES_HOST') ?? 'localhost';

    return {
      type: 'postgres',
      url: `postgresql://${username}:${password}@${host}/${dbName}`,
      synchronize: true,
      entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    };
  }
}
