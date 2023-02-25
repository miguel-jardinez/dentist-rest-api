import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PatientFormService } from './patient-form.service';
import { CreatePatientPersonalFormDto } from './dto/personal-form/create-patient-personal-form.dto';
import { UpdatePatientPersonalFormDto } from './dto/personal-form/update-patient-personal-form.dto';
import { CreatePatientRelativesFormDto } from './dto/relatives-form/create-patient-relatives-form.dto';
import { UpdatePatientRelativesFormDto } from './dto/relatives-form/update-patient-relatives-form.dto';
import { InterfaceController } from './interfaces/interface.controller';
import { RolesGuard } from '../guards/roles/roles.guard';
import { RolesAuth } from '../guards/roles/roles.decorator';
import { UserRole } from '../utils/RoleEnum';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('patient-form')
export class PatientFormController implements InterfaceController {
  constructor(private readonly patientFormService: PatientFormService) {}

  @RolesAuth(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @Post('/create-personal')
  createPersonalForm(
    @Body() createPatientPersonalFormDto: CreatePatientPersonalFormDto,
    @Req() req,
  ) {
    return this.patientFormService.createPersonalForm(
      req.user.id,
      createPatientPersonalFormDto,
    );
  }

  @RolesAuth(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @Post('/create-relatives')
  createRelativeForm(
    @Body() createPatientRelativeFormDto: CreatePatientRelativesFormDto,
    @Req() req,
  ) {
    return this.patientFormService.createRelativesForm(
      req.user.id,
      createPatientRelativeFormDto,
    );
  }

  @RolesAuth(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @Get('/personal/:id')
  findOnePersonalForm(@Param('id') id: string, @Req() req) {
    return this.patientFormService.findOnePersonalForm(req.user.id, id);
  }

  @RolesAuth(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @Get('/relatives/:id')
  findOneRelativesForm(@Param('id') id: string, @Req() req) {
    return this.patientFormService.findOneRelativesForm(req.user.id, id);
  }

  @RolesAuth(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @Put('/personal/update/:id')
  updatePersonalForm(
    @Param('id') id: string,
    personalForm: UpdatePatientPersonalFormDto,
    @Req() req,
  ) {
    return this.patientFormService.updatePersonalForm(
      req.user.id,
      id,
      personalForm,
    );
  }

  @RolesAuth(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @Put('/relatives/update/:id')
  updateRelativesForm(
    @Param('id') id: string,
    relativeForm: UpdatePatientRelativesFormDto,
    @Req() req,
  ) {
    return this.patientFormService.updateRelativeForm(
      req.user.id,
      id,
      relativeForm,
    );
  }
}
