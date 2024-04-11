import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DentistProfileService } from './dentist_profile.service';
import { CreateDentistProfileDto } from './dto/create-dentist_profile.dto';
import { UpdateDentistProfileDto } from './dto/update-dentist_profile.dto';

@Controller('dentist-profile')
export class DentistProfileController {
  constructor(private readonly dentistProfileService: DentistProfileService) {}

  @Post()
  create(@Body() createDentistProfileDto: CreateDentistProfileDto) {
    return this.dentistProfileService.create(createDentistProfileDto, '');
  }

  @Get()
  findAll() {
    return this.dentistProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dentistProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDentistProfileDto: UpdateDentistProfileDto,
  ) {
    return this.dentistProfileService.update(id, updateDentistProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dentistProfileService.remove(id);
  }
}
