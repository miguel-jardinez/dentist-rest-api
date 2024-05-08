import { Injectable } from '@nestjs/common';
import { UpdateWorkingScheduleDto } from './dto/update-working_schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkingScheduleEntity } from '@features/working_schedule/entities/working_schedule.entity';
import { Repository, UpdateResult } from 'typeorm';
import { WorkingScheduleServiceInterface } from '@features/working_schedule/type/working_schedule.service.interface';
import { ResponseApi } from '@utils/ResponseApi';
import * as console from 'node:console';
import { DaysOfWeek } from '@features/working_schedule/utils/DaysOfWeek';

@Injectable()
export class WorkingScheduleService implements WorkingScheduleServiceInterface {
  constructor(
    @InjectRepository(WorkingScheduleEntity)
    private readonly workingScheduleEntity: Repository<WorkingScheduleEntity>
  ) {}

  async updateWorkingSchedule(
    establishmentId: string,
    workingDayId: string,
    updateWorkingSchedule: UpdateWorkingScheduleDto
  ): Promise<ResponseApi<UpdateResult>> {
    try {
      const data = await this.workingScheduleEntity.update({ establishment: { id: establishmentId}, id: workingDayId }, updateWorkingSchedule)
      return new ResponseApi(data, true, Date())
    } catch (e: any) {
      console.log(e)
    }
  }

  async createWorkingSchedule(establishmentId: string): Promise<ResponseApi<Array<WorkingScheduleEntity>>> {
    try {
      const data = Object
        .values(DaysOfWeek)
        .map(day => this.workingScheduleEntity.create({ day, enabledToWork: false, establishment: { id: establishmentId } }))

      const response = await this.workingScheduleEntity.save(data)

      return new ResponseApi(response, true, Date())
    } catch (e: any) {
      console.log(e)
    }
  }

  async getOneWorkingSchedule(establishmentId: string, workingScheduleId: string): Promise<ResponseApi<WorkingScheduleEntity>> {
    try {
      const data = await this.workingScheduleEntity.findOne({ where: { establishment: { id: establishmentId }, id: workingScheduleId }, relations: { establishment: true } })
      return new ResponseApi(data, true, Date())
    } catch (e: any) {
      console.log(e)
    }
  }

  async getWorkingSchedule(establishmentId: string): Promise<ResponseApi<Array<WorkingScheduleEntity>>> {
    try {
      const data = await this.workingScheduleEntity.find({ where: { establishment: { id: establishmentId } }, relations: { establishment: true } })
      return new ResponseApi(data, true, Date())
    } catch (e: any) {
      console.log(e)
    }
  }
}
