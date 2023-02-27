import { Injectable, Logger } from '@nestjs/common';
import { InterfaceService } from './interfaces/interface.service';
import { UserEntity } from '../users/entities/user.entity';
import { ErrorService } from '../utils/ErrorService';
import { UsersService } from '../users/users.service';

@Injectable()
export class DentistsService implements InterfaceService {
  private readonly logger = new Logger(DentistsService.name);

  constructor(
    private readonly errorService: ErrorService,
    private readonly userService: UsersService,
  ) {}
  public async getAllDentist(region: string): Promise<UserEntity[]> {
    try {
      const data = await this.userService.findDentistByRegion(region);

      this.logger.log(`${data.length} Dentist(s) found in region ${region}`);

      return data;
    } catch (e) {
      this.logger.error(`Error to found any dentist in this region ${region}`);
      this.errorService.errorHandling('404', e.message);
    }
  }

  async getOneDentist(id: string): Promise<UserEntity> {
    try {
      return this.userService.findDentistById(id);
    } catch (e) {
      this.logger.error(`Dentist with user_id: ${id} not found`);
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
