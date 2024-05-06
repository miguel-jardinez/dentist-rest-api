import { ResponseApi } from '@utils/ResponseApi';
import { TeethEntity } from '@seeder/teeths/entities/teeth.entity';

export interface TeethServiceInterface {
  seedTeeth: () => Promise<ResponseApi<Array<TeethEntity>>>;
}
