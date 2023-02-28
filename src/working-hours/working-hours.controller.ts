import {
  Controller,
  Delete,
  Post,
  Req,
  Put,
  Param,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { WorkingHoursService } from './working-hours.service';
import { CreateWorkingHourDto } from './dto/create-working-hour.dto';
import { UpdateWorkingHourDto } from './dto/update-working-hour.dto';
import { InterfaceMethods } from './interface/interface.methods';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../utils/RoleEnum';
import { RolesAuth } from '../guards/roles/roles.decorator';
import { RolesGuard } from '../guards/roles/roles.guard';
import { WorkingDaysEntity } from './entities/working-days.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('working-hours')
export class WorkingHoursController implements InterfaceMethods {
  constructor(private readonly workingHoursService: WorkingHoursService) {}

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Post('/create')
  public createWorkingDay(
    @Body() createDayDto: CreateWorkingHourDto,
    @Req() req,
  ): Promise<WorkingDaysEntity> {
    return this.workingHoursService.createWorkingDay(createDayDto, req.user);
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Delete('/delete/:workingDayId')
  public deleteWorkingDay(
    @Param('workingDayId') workingDayId: string,
    @Req() req,
  ): Promise<string> {
    return this.workingHoursService.deleteWorkingDay(workingDayId, req.user);
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Put('/update/:workingDayId')
  public updateWorkingDat(
    @Param('workingDayId') workingDayId: string,
    @Body() updateWorkingDay: UpdateWorkingHourDto,
    @Req() req,
  ): Promise<string> {
    return this.workingHoursService.updateWorkingDat(
      workingDayId,
      updateWorkingDay,
      req.user,
    );
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Get()
  getWorkingDays(@Req() req): Promise<WorkingDaysEntity[]> {
    return this.workingHoursService.getWorkingDays(req.user);
  }
}
