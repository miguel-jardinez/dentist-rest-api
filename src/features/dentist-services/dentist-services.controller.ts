import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DentistServicesService } from './dentist-services.service';
import { CreateDentistServiceDto } from './dto/services/create-dentist-service.dto';
import { UpdateDentistServiceDto } from './dto/services/update-dentist-service.dto';
import { UserRole } from '../../utils/RoleEnum';
import { RolesAuth } from '../../guards/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles/roles.guard';

@Controller('dentists-services')
@UseGuards(AuthGuard('jwt'))
export class DentistServicesController {
  constructor(
    private readonly dentistServicesService: DentistServicesService,
  ) {}

  // @Post('/create')
  // @RolesAuth(UserRole.DENTIST)
  // @UseGuards(RolesGuard)
  // create(@Body() createDentistServiceDto: CreateDentistServiceDto, @Req() req) {
  //   const id = req.user.id;
  //   return this.dentistServicesService.create(createDentistServiceDto, id);
  // }
  //
  // @Get()
  // @RolesAuth(UserRole.DENTIST)
  // @UseGuards(RolesGuard)
  // findAll(@Req() req) {
  //   return this.dentistServicesService.findAll(req.user.id);
  // }
  //
  // @Get(':id')
  // @RolesAuth(UserRole.DENTIST)
  // @UseGuards(RolesGuard)
  // findOne(@Param('id') id: string) {
  //   return this.dentistServicesService.findOne(id);
  // }
  //
  // @Put(':id')
  // @RolesAuth(UserRole.DENTIST)
  // @UseGuards(RolesGuard)
  // update(
  //   @Param('id') serviceId: string,
  //   @Body() updateDentistServiceDto: UpdateDentistServiceDto,
  //   @Req() req,
  // ) {
  //   return this.dentistServicesService.update(
  //     serviceId,
  //     req.user.id,
  //     updateDentistServiceDto,
  //   );
  // }
  //
  // @Delete(':id')
  // @RolesAuth(UserRole.DENTIST)
  // @UseGuards(RolesGuard)
  // remove(@Param('id') serviceId: string, @Req() req) {
  //   return this.dentistServicesService.remove(serviceId, req.user.id);
  // }
}
