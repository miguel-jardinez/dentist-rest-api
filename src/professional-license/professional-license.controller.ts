import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfessionalLicenseService } from './professional-license.service';
import { CreateProfessionalLicenseDto } from './dto/create-professional-license.dto';
import { UpdateProfessionalLicenseDto } from './dto/update-professional-license.dto';
import { InterfaceController } from './interfaces/interface.controller';
import { ProfessionalLicenseEntity } from './entities/professional-license.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetLicenseDto } from './dto/get-license.dto';
import { ItemsLicense } from './types/licenseResponse';
import { RolesAuth } from '../guards/roles/roles.decorator';
import { UserRole } from '../utils/RoleEnum';
import { RolesGuard } from '../guards/roles/roles.guard';

@Controller('license')
@UseGuards(AuthGuard('jwt'))
export class ProfessionalLicenseController implements InterfaceController {
  constructor(
    private readonly professionalLicenseService: ProfessionalLicenseService,
  ) {}

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Post('/create')
  createProfessionalLicense(
    @Body() createLicense: CreateProfessionalLicenseDto,
    @Req() request,
  ): Promise<ProfessionalLicenseEntity> {
    return this.professionalLicenseService.createProfessionalLicense(
      createLicense,
      request.user.id,
    );
  }

  @Post('/get-license')
  getProfessionalLicense(
    @Body() getLicenseDto: GetLicenseDto,
  ): Promise<ItemsLicense> {
    return this.professionalLicenseService.getProfessionalLicense(
      getLicenseDto,
    );
  }

  @RolesAuth(UserRole.DENTIST)
  @UseGuards(RolesGuard)
  @Put('/update/license/:licenseId')
  updateProfessionalLicense(
    @Body() updateLicense: UpdateProfessionalLicenseDto,
    @Param() licenseId: string,
    @Req() request,
  ): Promise<string> {
    return this.professionalLicenseService.updateProfessionalLicense(
      updateLicense,
      licenseId,
      request.user.id,
    );
  }
}
