import { Module } from '@nestjs/common';
import { DentistsService } from './dentists.service';
import { DentistsController } from './dentists.controller';
import { ErrorService } from '../utils/ErrorService';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [DentistsController],
  providers: [DentistsService, ErrorService],
})
export class DentistsModule {}
