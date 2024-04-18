import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesEntity } from '@seeder/states/entities/states.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatesEntity])],
  controllers: [StatesController],
  providers: [StatesService],
  exports: [StatesService],
})
export class StatesModule {}
