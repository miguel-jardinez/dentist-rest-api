import { ResponseApi } from '@utils/ResponseApi';
import { TeethEntity } from '@seeder/teeths/entities/teeth.entity';

export interface TeethControllerInterface {
  seedTeeth: () => Promise<ResponseApi<Array<TeethEntity>>>;
}
