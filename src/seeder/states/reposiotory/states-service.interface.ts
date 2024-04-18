import { ResponseApi } from '@utils/ResponseApi';
import { StatesEntity } from '@seeder/states/entities/states.entity';

export interface StatesServiceInterface {
  createStatesList: () => Promise<ResponseApi<StatesEntity[]>>;
  getStates: () => Promise<ResponseApi<StatesEntity[]>>;
}
