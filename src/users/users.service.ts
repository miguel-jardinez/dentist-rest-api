import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorService } from '../utils/ErrorService';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly errorService: ErrorService,
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.user.create(createUserDto);
    try {
      const userCreated = await this.user.save<UserEntity>(user);
      return userCreated;
    } catch (e) {
      this.errorService.errorHandling(e.code, user.email);
    }
  }

  findAll(): Promise<UserEntity[]> {
    return this.user.find({});
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.user.findOneOrFail({ where: { id } });
      return user;
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
      this.errorService.errorHandling(e.status.toString(), e.response);
    }
  }
}
