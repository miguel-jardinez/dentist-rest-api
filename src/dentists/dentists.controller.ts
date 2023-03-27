import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DentistsService } from './dentists.service';
import { InterfaceController } from './interfaces/interface.controller';
import { UserEntity } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesAuth } from '../guards/roles/roles.decorator';
import { UserRole } from '../utils/RoleEnum';
import { RolesGuard } from '../guards/roles/roles.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('dentists')
export class DentistsController implements InterfaceController {
  constructor(private readonly dentistsService: DentistsService) {}

  @RolesAuth(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @Get('/find-all/:region')
  getAllDentistRegion(@Param('region') region: string): Promise<UserEntity[]> {
    return this.dentistsService.getAllDentist(region);
  }

  @RolesAuth(UserRole.PATIENT)
  @UseGuards(RolesGuard)
  @Get('/find-one/:id')
  getOneDentist(id: string): Promise<UserEntity> {
    return this.dentistsService.getOneDentist(id);
  }
}
