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
import { DentistServicesService } from './dentist-services.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { DentistServicesControllerInterface } from '@features/dentist-services/repository/dentist-services.controller.interface';
import { CreateDentistServiceDto } from '@features/dentist-services/dto/services/create-dentist-service.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { DentistServiceEntity } from '@features/dentist-services/entities/dentist-service.entity';
import { DeleteDentistServiceDto } from '@features/dentist-services/dto/services/delete-dentist-service.dto';
import { UpdateDentistServiceDto } from '@features/dentist-services/dto/services/update-dentist-service.dto';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { UserRole } from '@utils/RoleEnum';
import { RolesGuard } from '@guards/roles/roles.guard';
import { UpdateResult } from 'typeorm';

@ApiTags('Dentist Services')
@Controller('dentistsServices')
@UseGuards(AuthGuard('jwt'))
export class DentistServicesController
  implements DentistServicesControllerInterface
{
  constructor(
    private readonly dentistServicesService: DentistServicesService,
  ) {}

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Post(':establishmentId')
  @ApiBody({ type: CreateDentistServiceDto })
  @ApiParam({ name: 'establishmentId' })
  createEstablishmentService(
    @Body() createServiceDto: CreateDentistServiceDto,
    @Param('establishmentId') establishmentId: string,
  ): Promise<ResponseApi<DentistServiceEntity>> {
    return this.dentistServicesService.createEstablishmentService(
      createServiceDto,
      establishmentId,
    );
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @ApiBody({ type: DeleteDentistServiceDto })
  @ApiParam({ name: 'establishmentId' })
  @Delete(':establishmentId')
  deleteEstablishmentServices(
    @Param('establishmentId') establishmentId: string,
    @Body() deleteEstablishmentServices: DeleteDentistServiceDto,
  ): Promise<ResponseApi<Array<DentistServiceEntity>>> {
    return this.dentistServicesService.deleteEstablishmentServices(
      establishmentId,
      deleteEstablishmentServices,
    );
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Get(':establishmentId')
  @ApiParam({ name: 'establishmentId' })
  getAllEstablishmentServices(
    @Param('establishmentId') establishmentId: string,
  ): Promise<ResponseApi<Array<DentistServiceEntity>>> {
    return this.dentistServicesService.getAllEstablishmentServices(
      establishmentId,
    );
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Get(':establishmentId/:serviceId')
  @ApiParam({ name: 'establishmentId' })
  @ApiParam({ name: 'serviceId' })
  getOneEstablishmentServices(
    @Param('establishmentId') establishmentId: string,
    @Param('serviceId') serviceId: string,
  ): Promise<ResponseApi<DentistServiceEntity>> {
    return this.dentistServicesService.getOneEstablishmentServices(
      establishmentId,
      serviceId,
    );
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Patch(':establishmentId/:serviceId')
  @ApiParam({ name: 'establishmentId' })
  @ApiParam({ name: 'serviceId' })
  @ApiBody({ type: UpdateDentistServiceDto })
  updateEstablishmentServices(
    @Param('establishmentId') establishmentId: string,
    @Param('serviceId') serviceId: string,
    @Body() updateEstablishmentDto: UpdateDentistServiceDto,
  ): Promise<ResponseApi<UpdateResult>> {
    return this.dentistServicesService.updateEstablishmentServices(
      establishmentId,
      serviceId,
      updateEstablishmentDto,
    );
  }
}
