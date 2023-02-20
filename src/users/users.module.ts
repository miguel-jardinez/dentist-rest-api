import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ErrorService } from '../utils/ErrorService';
import { ProfileService } from '../profile/profile.service';
import { ProfileEntity } from '../profile/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [UsersController],
  providers: [UsersService, ErrorService, ProfileService],
  exports: [UsersService],
})
export class UsersModule {}
