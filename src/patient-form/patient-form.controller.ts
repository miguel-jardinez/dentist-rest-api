import { Controller, Get, Post, Body, Param, Put, Req } from '@nestjs/common';
import { PatientFormService } from './patient-form.service';
import { CreatePatientPersonalFormDto } from './dto/personal-form/create-patient-personal-form.dto';
import { UpdatePatientPersonalFormDto } from './dto/personal-form/update-patient-personal-form.dto';
import { CreatePatientRelativesFormDto } from './dto/relatives-form/create-patient-relatives-form.dto';
import { UpdatePatientRelativesFormDto } from './dto/relatives-form/update-patient-relatives-form.dto';

@Controller('patient-form')
export class PatientFormController {
  constructor(private readonly patientFormService: PatientFormService) {}

  @Post('/create-personal')
  createPersonalForm(
    @Body() createPatientPersonalFormDto: CreatePatientPersonalFormDto,
    @Req() req,
  ) {
    return this.patientFormService.createPersonalForm(
      createPatientPersonalFormDto,
      req.user.id,
    );
  }

  @Post('/create-relatives')
  createRelativeForm(
    @Body() createPatientRelativeFormDto: CreatePatientRelativesFormDto,
    @Req() req,
  ) {
    return this.patientFormService.createRelativesForm(
      createPatientRelativeFormDto,
      req.user.id,
    );
  }

  @Get('/personal/:id')
  findOnePersonalForm(@Param('id') id: string) {
    return this.patientFormService.findOnePersonalForm(id);
  }

  @Get('/relatives/:id')
  findOneRelativesForm(@Param('id') id: string) {
    return this.patientFormService.findOneRelativesForm(id);
  }

  @Put('/personal/update/:id')
  updatePersonalForm(
    @Param('id') id: string,
    personalForm: UpdatePatientPersonalFormDto,
    @Req() req,
  ) {
    return this.patientFormService.updatePersonalForm(
      id,
      personalForm,
      req.user.id,
    );
  }

  @Put('/relatives/update/:id')
  updateRelativesForm(
    @Param('id') id: string,
    relativeForm: UpdatePatientRelativesFormDto,
    @Req() req,
  ) {
    return this.patientFormService.updateRelativeForm(
      id,
      relativeForm,
      req.user.id,
    );
  }
}
