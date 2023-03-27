import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorService } from '../utils/ErrorService';
import { UserServiceInterface } from './interfaces/UserService.interface';
import { UserRole } from '../utils/RoleEnum';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(
    private readonly configService: ConfigService,
    private readonly errorService: ErrorService,
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.user.create(createUserDto);
      return await this.user.save<UserEntity>(user);
    } catch (e) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  public findAll(): Promise<UserEntity[]> {
    return this.user.find({ relations: { profile: true } });
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      return await this.user.findOneOrFail({
        where: { id },
        relations: { profile: true },
      });
    } catch (e) {
      this.errorService.errorHandling('u-404', e.message);
    }
  }

  async remove(id: string) {
    try {
      const userDeleted = await this.user.delete({ id });
      if (userDeleted.affected !== 0) {
        return `User ${id} was deleted successfully`;
      }
      return this.errorService.errorHandling('u-404', id);
    } catch (e) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.user.findOne({ where: { email } });
    } catch (e) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  public async findDentistByRegion(region: string): Promise<UserEntity[]> {
    try {
      return await this.user.find({
        where: {
          role: UserRole.DENTIST,
          profile: { address: { iso_code: region } },
        },
        relations: {
          profile: {
            services: true,
            address: true,
            license: true,
          },
        },
      });
    } catch (e) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  public async findDentistById(id): Promise<UserEntity> {
    try {
      return await this.user.findOneOrFail({
        where: {
          role: UserRole.DENTIST,
          id,
        },
        relations: {
          profile: {
            services: true,
            address: true,
            license: true,
          },
        },
      });
    } catch (e) {
      this.errorService.errorHandling(e.code, e.message);
    }
  }
}
