import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ErrorService } from '@utils/ErrorService';
import { UserServiceInterface } from '@features/users/interfaces/UserService.interface';
import { UserEntity } from '@features/users/entities/user.entity';
import { CreateUserDto } from '@features/users/dto/create-user.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { CustomerProfileService } from '@features/customer_profile/customerProfile.service';
import { DentistProfileService } from '@features/dentist-profile/dentist-profile.service';
import { UserRole } from '@utils/RoleEnum';
import { CreateDentistProfileDto } from '@features/dentist-profile/dto/create-dentist-profile.dto';
import { CreateProfileDto } from '@features/customer_profile/dto/create-profile.dto';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(
    private readonly errorService: ErrorService,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly dentistProfileService: DentistProfileService,
    private readonly customerProfileService: CustomerProfileService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseApi<UserEntity>> {
    try {
      const user = this.userEntityRepository.create(createUserDto);
      const userEntity = await this.userEntityRepository.save(user);

      if (user.role === UserRole.DENTIST) {
        const dentistProfileDto = new CreateDentistProfileDto();
        console.log('DENTIST', dentistProfileDto, userEntity.id);
        await this.dentistProfileService.create(
          dentistProfileDto,
          userEntity.id,
        );
      } else {
        const customerProfileDto = new CreateProfileDto();
        console.log('CUSTOMER', customerProfileDto, userEntity.id);
        await this.customerProfileService.createProfile(
          customerProfileDto,
          userEntity.id,
        );
      }

      return new ResponseApi<UserEntity>(userEntity, true, Date());
    } catch (e: any) {
      console.log(e.message);
      this.errorService.errorHandling(e.code, e.message);
    }
  }

  async findAll(): Promise<ResponseApi<UserEntity[]>> {
    try {
      const users = await this.userEntityRepository.find();
      return new ResponseApi<UserEntity[]>(users, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }

  async findByEmail(email: string): Promise<ResponseApi<UserEntity>> {
    try {
      const user = await this.userEntityRepository.findOne({
        where: { email },
        relations: { customerProfile: true, dentistProfile: true },
      });
      return new ResponseApi<UserEntity>(user, true, Date.now().toString());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }

  async findById(id: string): Promise<ResponseApi<UserEntity>> {
    try {
      const user = await this.userEntityRepository.findOneByOrFail({ id });
      return new ResponseApi<UserEntity>(user, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }

  async remove(id: string): Promise<ResponseApi<DeleteResult>> {
    try {
      const userDeleted = await this.userEntityRepository.delete({ id });
      return new ResponseApi<DeleteResult>(userDeleted, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }
}
