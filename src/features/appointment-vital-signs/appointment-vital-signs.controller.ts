import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppointmentVitalSignsService } from './appointment-vital-signs.service';
import { UpdateAppointmentVitalSignDto } from './dto/update-appointment-vital-sign.dto';
import { AppointmentVitalSignControllerInterface } from '@features/appointment-vital-signs/repository/appointment-vital-sign-controller.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { AppointmentVitalSignEntity } from '@features/appointment-vital-signs/entities/appointment-vital-sign.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@guards/roles/roles.guard';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { UserRole } from '@utils/RoleEnum';
import { CreateAppointmentVitalSignDto } from '@features/appointment-vital-signs/dto/create-appointment-vital-sign.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Appointment Vital Signs')
@Controller('appointmentVitalSigns')
@UseGuards(AuthGuard('jwt'))
export class AppointmentVitalSignsController
  implements AppointmentVitalSignControllerInterface
{
  constructor(
    private readonly appointmentVitalSignsService: AppointmentVitalSignsService,
  ) {}

  @Post(':appointmentId')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  createVitalSignsAppointment(
    @Param('appointmentId') appointmentId: string,
    @Body() createVitalSignsDto: CreateAppointmentVitalSignDto,
  ): Promise<ResponseApi<AppointmentVitalSignEntity>> {
    return this.appointmentVitalSignsService.createVitalSignsAppointment(
      appointmentId,
      createVitalSignsDto,
    );
  }

  @Delete(':appointmentId/:id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  deleteVitalSignsAppointment(
    @Param('appointmentId') appointmentId: string,
    @Param('id') vitalSignsId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    return this.appointmentVitalSignsService.deleteVitalSignsAppointment(
      appointmentId,
      vitalSignsId,
    );
  }

  @Get(':id')
  @RolesAuth(UserRole.DENTIST, UserRole.CUSTOMER)
  @UseGuards(RolesGuard)
  getOneVitalSignsAppointment(
    @Param('appointmentId') appointmentId: string,
    @Param('id') vitalSignsId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    return this.appointmentVitalSignsService.getOneVitalSignsAppointment(
      appointmentId,
      vitalSignsId,
    );
  }

  @Patch(':appointmentId/:id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  updateVitalSignsAppointment(
    @Param('id') id: string,
    @Param('appointmentId') appointmentId: string,
    @Body() updateVitalSigns: UpdateAppointmentVitalSignDto,
  ): Promise<ResponseApi<DeleteResult>> {
    return this.appointmentVitalSignsService.updateVitalSignsAppointment(
      id,
      appointmentId,
      updateVitalSigns,
    );
  }
}
