import { Module } from '@nestjs/common';
import { TeethService } from './teeth.service';
import { TeethController } from './teeth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeethEntity } from '@seeder/teeths/entities/teeth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeethEntity])],
  controllers: [TeethController],
  providers: [TeethService],
  exports: [TeethService],
})
export class TeethModule {}
