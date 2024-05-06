import { Injectable } from '@nestjs/common';
import { TeethServiceInterface } from '@seeder/teeths/repository/teeth.service.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { TeethEntity } from '@seeder/teeths/entities/teeth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeethJson } from '@seeder/teeths/utils/teethJson';

@Injectable()
export class TeethService implements TeethServiceInterface {
  constructor(
    @InjectRepository(TeethEntity)
    private readonly teethEntity: Repository<TeethEntity>,
  ) {}

  async seedTeeth(): Promise<ResponseApi<Array<TeethEntity>>> {
    try {
      const data = TeethJson.map((tooth) => this.teethEntity.create(tooth));

      const response = await this.teethEntity.save(data);
      return new ResponseApi(response, true, Date());
    } catch (e: any) {
      console.log(e);
    }
  }
}
