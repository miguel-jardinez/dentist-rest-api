import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { UsersModule } from '../users/users.module';
import { ErrorService } from '../utils/ErrorService';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity]), UsersModule],
  controllers: [ProfileController],
  providers: [ProfileService, ErrorService],
  exports: [ProfileService],
})
export class ProfileModule {}
