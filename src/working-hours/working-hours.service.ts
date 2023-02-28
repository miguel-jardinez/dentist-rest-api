import { Injectable, Logger } from '@nestjs/common';
import { CreateWorkingHourDto } from './dto/create-working-hour.dto';
import { UpdateWorkingHourDto } from './dto/update-working-hour.dto';
import { InterfaceMethods } from './interface/interface.methods';
import { WorkingDaysEntity } from './entities/working-days.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkingHourEntity } from './entities/working-hour.entity';
import { ErrorService } from '../utils/ErrorService';
import { Usertype } from '../utils/types/User';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class WorkingHoursService implements InterfaceMethods {
  private readonly logger = new Logger(WorkingHoursService.name);

  constructor(
    private readonly errorService: ErrorService,
    private readonly profileService: ProfileService,
    @InjectRepository(WorkingDaysEntity)
    private readonly daysRepository: Repository<WorkingDaysEntity>,
    @InjectRepository(WorkingHourEntity)
    private readonly hoursRepository: Repository<WorkingHourEntity>,
  ) {}

  public async createWorkingDay(
    createDayDto: CreateWorkingHourDto,
    user: Usertype,
  ): Promise<WorkingDaysEntity> {
    try {
      const profile = await this.profileService.findByUserId(user);
      const createDay = this.daysRepository.create({ day: createDayDto.day });
      const createHours = this.hoursRepository.create({
        start_work: createDayDto.start_work,
        end_work: createDayDto.end_work,
      });

      const dataDay = await this.daysRepository.save({
        ...createDay,
        profile: { id: profile.id },
      });

      await this.hoursRepository.save({
        ...createHours,
        days: { id: dataDay.id },
      });

      this.logger.log(`Working day created to user_id: ${user.id}`);

      return dataDay;
    } catch (e) {
      this.errorService.errorHandling(e.code, e.message);
      this.logger.error(`Error creating working error to user_id:${user.id}`);
    }
  }

  public async deleteWorkingDay(
    workingDayId: string,
    user: Usertype,
  ): Promise<string> {
    try {
      const data = await this.daysRepository.delete({ id: workingDayId });

      if (data.affected === 0) {
        this.logger.error(
          `Error deleting working hours id ${workingDayId}  to user_id:${user.id}`,
        );
        this.errorService.errorHandling('404');
      }

      this.logger.log(
        `Working day: ${workingDayId} deleted to user_id:${user.id} successfully`,
      );

      return `working day ${workingDayId} deleted correctly`;
    } catch (e) {
      this.logger.error(
        `Error deleting working hours id ${workingDayId}  to user_id:${user.id}`,
      );
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  public async updateWorkingDat(
    workingDayId: string,
    updateWorkingDay: UpdateWorkingHourDto,
    user: Usertype,
  ): Promise<string> {
    try {
      const data = await this.hoursRepository.update(
        { days: { id: workingDayId, profile: { user: { id: user.id } } } },
        {
          start_work: updateWorkingDay.start_work,
          end_work: updateWorkingDay.end_work,
        },
      );

      if (data.affected === 0) {
        this.logger.error(
          `Error updating working hours id ${workingDayId}  to user_id:${user.id}`,
        );
        this.errorService.errorHandling('404');
      }

      this.logger.log(
        `Working day: ${workingDayId} updated to user_id:${user.id} successfully`,
      );

      return `working day ${workingDayId} updated correctly`;
    } catch (e) {
      this.logger.error(
        `Error updating working hours id ${workingDayId}  to user_id:${user.id}`,
      );
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  public async getWorkingDays(user: Usertype): Promise<WorkingDaysEntity[]> {
    try {
      const data = await this.daysRepository.find({
        where: { profile: { user: { id: user.id } } },
        relations: {
          hours: true,
        },
      });
      this.logger.log(`Fetching working days to user_id:${user.id} correctly`);

      return data;
    } catch (e) {
      this.logger.error(`Error fetching working hours to user_id:${user.id}`);
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
