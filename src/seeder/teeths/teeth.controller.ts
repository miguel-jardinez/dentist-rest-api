import { Controller, Post } from '@nestjs/common';
import { TeethService } from './teeth.service';
import { TeethControllerInterface } from '@seeder/teeths/repository/teeth.controller.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { TeethEntity } from '@seeder/teeths/entities/teeth.entity';

@Controller('teeth')
export class TeethController implements TeethControllerInterface {
  constructor(private readonly teethService: TeethService) {}

  @Post()
  seedTeeth(): Promise<ResponseApi<Array<TeethEntity>>> {
    return this.teethService.seedTeeth();
  }
}
