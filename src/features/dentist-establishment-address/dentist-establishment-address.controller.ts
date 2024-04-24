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
import { UpdateDentistEstablishmentAddressDto } from './dto/update-dentist-establishment-address.dto';
import { EstablishmentAddressService } from '@features/dentist-establishment-address/dentist-establishment-address.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateDentistEstablishmentAddressDto } from '@features/dentist-establishment-address/dto/create-dentist-establishment-address.dto';
import { EstablishmentAddressEntity } from '@features/dentist-establishment-address/entities/establishment_address.entity';
import { AuthGuard } from '@nestjs/passport';
import { DentistEstablishmentAddressControllerInterface } from '@features/dentist-establishment-address/repository/dentist-establishment-address.controller.interface';
import { ResponseApi } from '@utils/ResponseApi';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from '@guards/roles/roles.guard';
import { UserRole } from '@utils/RoleEnum';
import { RolesAuth } from '@guards/roles/roles.decorator';

@ApiTags('Dentist Establishment Address')
@Controller('dentistEstablishmentAddress')
@UseGuards(AuthGuard('jwt'))
export class EstablishmentAddressController
  implements DentistEstablishmentAddressControllerInterface
{
  constructor(
    private readonly establishmentAddressService: EstablishmentAddressService,
  ) {}

  @ApiBody({ type: CreateDentistEstablishmentAddressDto })
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Post()
  createEstablishmentDentistAddress(
    @Body() createEstablishmentDto: CreateDentistEstablishmentAddressDto,
  ): Promise<ResponseApi<EstablishmentAddressEntity>> {
    return this.establishmentAddressService.createEstablishmentDentistAddress(
      createEstablishmentDto,
    );
  }

  @ApiParam({ name: 'establishmentId' })
  @ApiParam({ name: 'establishmentAddressId' })
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Delete(':establishmentId/:establishmentAddressId')
  deleteEstablishmentDentistAddress(
    @Param('establishmentId') establishmentId: string,
    @Param('establishmentAddressId') establishmentAddressId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    return this.establishmentAddressService.deleteEstablishmentDentistAddress(
      establishmentId,
      establishmentAddressId,
    );
  }

  @ApiParam({ name: 'establishmentId' })
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Get(':establishmentId')
  getEstablishmentAddress(
    @Param('establishmentId') establishmentId: string,
  ): Promise<ResponseApi<EstablishmentAddressEntity>> {
    return this.establishmentAddressService.getEstablishmentAddress(
      establishmentId,
    );
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @ApiBody({ type: UpdateDentistEstablishmentAddressDto })
  @Patch(':establishmentAddressId')
  updateEstablishmentDentistAddress(
    @Param('establishmentAddressId') establishmentAddressId: string,
    @Body() updateEstablishmentAddressDto: UpdateDentistEstablishmentAddressDto,
  ): Promise<ResponseApi<UpdateResult>> {
    return this.establishmentAddressService.updateEstablishmentDentistAddress(
      establishmentAddressId,
      updateEstablishmentAddressDto,
    );
  }
}
