import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ErrorService } from '@utils/ErrorService';
import { CustomerProfileModule } from '@features/customer_profile/customerProfile.module';
import { DentistProfileModule } from '@features/dentist_profile/dentist_profile.module';

@Module({
  imports: [
    CustomerProfileModule,
    DentistProfileModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ErrorService],
  exports: [UsersService],
})
export class UsersModule {}
