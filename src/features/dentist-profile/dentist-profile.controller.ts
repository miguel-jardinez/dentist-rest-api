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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OkResponseArrayApi } from '@utils/OkResponseArrayApi';
import { DentistProfileEntity } from '@features/dentist-profile/entities/dentist_profile.entity';
import { UserRole } from '@utils/RoleEnum';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { RolesGuard } from '@guards/roles/roles.guard';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Dentist Profile')
@Controller('dentistProfile')
export class DentistProfileController {
  constructor(private readonly dentistProfileService: DentistProfileService) {}

  @Post()
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @ApiBody({ type: CreateDentistProfileDto })
  @OkResponseArrayApi(DentistProfileEntity)
  create(@Body() createDentistProfileDto: CreateDentistProfileDto) {
    return this.dentistProfileService.create(createDentistProfileDto, '');
  }

  @Get()
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  findAll() {
    return this.dentistProfileService.findAll();
  }

  @Get(':id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.dentistProfileService.findOne(id);
  }

  @Patch(':id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateDentistProfileDto })
  update(
    @Param('id') id: string,
    @Body() updateDentistProfileDto: UpdateDentistProfileDto,
  ) {
    return this.dentistProfileService.update(id, updateDentistProfileDto);
  }

  @Delete(':id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.dentistProfileService.remove(id);
  }
}
