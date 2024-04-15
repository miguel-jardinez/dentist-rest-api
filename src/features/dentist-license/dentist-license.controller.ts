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
import { DentistLicenseService } from './dentist-license.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicenseControllerInterface } from '@features/dentist-license/repository/licenseController.interface';
import { AuthGuard } from '@nestjs/passport';
import { ResponseApi } from '@utils/ResponseApi';
import { DentistLicenseEntity } from '@features/dentist-license/entities/dentist-license.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { LicenseSepResponse } from '@features/dentist-license/types/LicenseSepResponse';
import { RequestUserData } from '@utils/RequestUserData';
import { RolesAuth } from '@guards/roles/roles.decorator';
import { UserRole } from '@utils/RoleEnum';
import { RolesGuard } from '@guards/roles/roles.guard';
import { GetLicenseDto } from '@features/dentist-license/dto/get-license.dto';

@Controller('dentistLicense')
@UseGuards(AuthGuard('jwt'))
export class DentistLicenseController implements LicenseControllerInterface {
  constructor(private readonly licenseService: DentistLicenseService) {}

  @Post('createLicense')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  createLicense(
    @Request() request: RequestUserData,
    @Body() createLicense: CreateLicenseDto,
  ): Promise<ResponseApi<DentistLicenseEntity>> {
    return this.licenseService.createLicense(
      request.user.profileId,
      createLicense,
    );
  }

  @Delete(':id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  deleteLicense(
    @Request() request: RequestUserData,
    @Param('id') licenseId: string,
  ): Promise<ResponseApi<DeleteResult>> {
    return this.licenseService.deleteLicense(request.user.profileId, licenseId);
  }

  @Post('getLicense')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  getLicenseData(
    @Body() getLicenseDto: GetLicenseDto,
  ): Promise<ResponseApi<LicenseSepResponse>> {
    return this.licenseService.getLicenseData(getLicenseDto);
  }

  @Patch(':id')
  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  updateLicense(
    @Request() request: RequestUserData,
    @Param('id') licenseId: string,
    @Body() updateLicenseDto: UpdateLicenseDto,
  ): Promise<ResponseApi<UpdateResult>> {
    return this.licenseService.updateLicense(
      request.user.profileId,
      licenseId,
      updateLicenseDto,
    );
  }

  @Get()
  getAllLicenses(
    @Request() request: RequestUserData,
  ): Promise<ResponseApi<Array<DentistLicenseEntity>>> {
    return this.licenseService.getAllLicenses(request.user.profileId);
  }

  @Get(':id')
  getOneLicense(
    @Request() request: RequestUserData,
    @Param('id') licenseId: string,
  ): Promise<ResponseApi<DentistLicenseEntity>> {
    return this.licenseService.getOneLicense(request.user.profileId, licenseId);
  }
}
