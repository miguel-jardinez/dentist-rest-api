import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresDbConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const dbURL = this.configService.get<string>('DATABASE_URL');

    return {
      type: 'postgres',
      url: dbURL,
      synchronize: true,
      entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    };
  }
}
