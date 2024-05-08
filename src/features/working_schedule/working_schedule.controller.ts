import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { WorkingScheduleService } from './working_schedule.service';
import { UpdateWorkingScheduleDto } from './dto/update-working_schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  WorkingScheduleControllerInterface,
} from '@features/working_schedule/type/working_schedule.controller.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { UserRole } from '@utils/RoleEnum';
import { RolesGuard } from '@guards/roles/roles.guard';
import { WorkingScheduleEntity } from '@features/working_schedule/entities/working_schedule.entity';

@ApiTags('Dentist Establishment Working Schedule')
@Controller('workingSchedule')
@UseGuards(AuthGuard('jwt'))
export class WorkingScheduleController implements WorkingScheduleControllerInterface {
  constructor(
    private readonly workingScheduleService: WorkingScheduleService,
  ) {}

  @Patch(':establishmentId/:workingDayId')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  updateWorkingSchedule(
    @Param('establishmentId') establishmentId: string,
    @Param('workingDayId') workingDayId: string,
    @Body() updateWorkingSchedule: UpdateWorkingScheduleDto
  ): Promise<ResponseApi<UpdateResult>> {
    return this.workingScheduleService.updateWorkingSchedule(establishmentId, workingDayId, updateWorkingSchedule)
  }

  @Get(':establishmentId/:workingScheduleId')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  getOneWorkingSchedule(
    @Param(':establishmentId') establishmentId: string,
    @Param(':workingScheduleId') workingScheduleId: string
  ): Promise<ResponseApi<WorkingScheduleEntity>> {
    return this.workingScheduleService.getOneWorkingSchedule(establishmentId, workingScheduleId)
  }

  @Get(':establishmentId')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  getWorkingSchedule(
    @Param(':establishmentId') establishmentId: string
  ): Promise<ResponseApi<Array<WorkingScheduleEntity>>> {
    return this.workingScheduleService.getWorkingSchedule(establishmentId)
  }


}
