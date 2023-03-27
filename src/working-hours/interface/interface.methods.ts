import { CreateWorkingHourDto } from '../dto/create-working-hour.dto';
import { WorkingDaysEntity } from '../entities/working-days.entity';
import { UpdateWorkingHourDto } from '../dto/update-working-hour.dto';
import { Usertype } from '../../utils/types/User';

export interface InterfaceMethods {
  createWorkingDay: (
    createDayDto: CreateWorkingHourDto,
    user: Usertype,
  ) => Promise<WorkingDaysEntity>;

  deleteWorkingDay: (workingDayId: string, user: Usertype) => Promise<string>;

  updateWorkingDat: (
    workingDayId: string,
    updateWorkingDay: UpdateWorkingHourDto,
    user: Usertype,
  ) => Promise<string>;

  getWorkingDays: (user: Usertype) => Promise<WorkingDaysEntity[]>;
}
