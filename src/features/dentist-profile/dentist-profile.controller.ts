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
import { DentistProfileService } from './dentist-profile.service';
import { CreateDentistProfileDto } from './dto/create-dentist-profile.dto';
import { UpdateDentistProfileDto } from './dto/update-dentist-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Dentist Profile')
@Controller('dentistProfile')
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
