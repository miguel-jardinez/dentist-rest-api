import { Injectable } from '@nestjs/common';
import { StatesServiceInterface } from '@seeder/states/reposiotory/states-service.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { StatesEntity } from '@seeder/states/entities/states.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { states } from '@seeder/states/data/stateList';

@Injectable()
export class StatesService implements StatesServiceInterface {
  constructor(
    @InjectRepository(StatesEntity)
    private readonly statesEntity: Repository<StatesEntity>,
  ) {}

  async createStatesList(): Promise<ResponseApi<StatesEntity[]>> {
    try {
      const state = this.statesEntity.create(states);
      const data = await this.statesEntity.save(state);
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async getStates(): Promise<ResponseApi<StatesEntity[]>> {
    try {
      const data = await this.statesEntity.find();
      return new ResponseApi(data, true, Date());
    } catch (e: any) {
      console.log(e.message);
    }
  }
}
