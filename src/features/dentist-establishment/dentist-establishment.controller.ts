import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DentistEstablishmentService } from './dentist-establishment.service';
import { CreateDentistEstablishmentDto } from './dto/create-dentist-establishment.dto';
import { UpdateDentistEstablishmentDto } from './dto/update-dentist-establishment.dto';
import { DentistEstablishmentControllerInterface } from '@features/dentist-establishment/repository/dentistEstablishmentController.interface';
import { RequestUserData } from '@utils/RequestUserData';
import { ResponseApi } from '@utils/ResponseApi';
import { DentistEstablishmentEntity } from '@features/dentist-establishment/entities/dentist-establishment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { UserRole } from '@utils/RoleEnum';
import { RolesGuard } from '@guards/roles/roles.guard';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseApi } from '@utils/ApiOkResponseApi';
import { OkResponseArrayApi } from '@utils/OkResponseArrayApi';

@ApiTags('Dentist Establishment')
@Controller('dentistEstablishment')
@UseGuards(AuthGuard('jwt'))
export class DentistEstablishmentController
  implements DentistEstablishmentControllerInterface
{
  constructor(
    private readonly dentistEstablishmentService: DentistEstablishmentService,
  ) {}

  @Post()
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @ApiBody({ type: CreateDentistEstablishmentDto })
  @ApiOkResponseApi(CreateDentistEstablishmentDto)
  createDentistEstablishment(
    @Request() request: RequestUserData,
    @Body() createDentistEstablishmentDto: CreateDentistEstablishmentDto,
  ): Promise<ResponseApi<DentistEstablishmentEntity>> {
    return this.dentistEstablishmentService.createDentistEstablishment(
      request.user.profileId,
      createDentistEstablishmentDto,
    );
  }

  @Delete(':id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id' })
  deleteDentistEstablishment(
    @Request() request: RequestUserData,
    @Param('id') establishmentId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    return this.dentistEstablishmentService.deleteDentistEstablishment(
      request.user.profileId,
      establishmentId,
    );
  }

  @Get()
  @RolesAuth(UserRole.DENTIST, UserRole.CUSTOMER)
  @UseGuards(RolesGuard)
  @OkResponseArrayApi(DentistEstablishmentEntity)
  getAllDentistEstablishment(
    @Request() request: RequestUserData,
  ): Promise<ResponseApi<DentistEstablishmentEntity[]>> {
    return this.dentistEstablishmentService.getAllDentistEstablishment(
      request.user.profileId,
    );
  }

  @Get(':id')
  @RolesAuth(UserRole.DENTIST, UserRole.CUSTOMER)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id' })
  @ApiOkResponseApi(DentistEstablishmentEntity)
  getOneDentistEstablishment(
    @Request() request: RequestUserData,
    @Param('id') establishmentId: string,
  ): Promise<ResponseApi<DentistEstablishmentEntity>> {
    return this.dentistEstablishmentService.getOneDentistEstablishment(
      request.user.profileId,
      establishmentId,
    );
  }

  @Patch(':id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @ApiBody({ type: UpdateDentistEstablishmentDto })
  @ApiOkResponseApi(UpdateDentistEstablishmentDto)
  updateDentistEstablishment(
    @Request() request: RequestUserData,
    @Param('id') establishmentId: string,
    @Body() updateDentistEstablishmentDto: UpdateDentistEstablishmentDto,
  ): Promise<ResponseApi<UpdateResult>> {
    return this.dentistEstablishmentService.updateDentistEstablishment(
      request.user.profileId,
      establishmentId,
      updateDentistEstablishmentDto,
    );
  }
}
