import { Injectable, Logger } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorService } from '../utils/ErrorService';

interface ProfileServiceInterface {
  create(createProfileDto: CreateProfileDto, id: string): Promise<string>;
  update(id: string, updateProfileDto: UpdateProfileDto): Promise<string>;
}

@Injectable()
export class ProfileService implements ProfileServiceInterface {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly errorService: ErrorService,
  ) {}

  async create(
    createProfileDto: CreateProfileDto,
    id: string,
  ): Promise<string> {
    try {
      const profileObject = this.profileRepository.create({
        ...createProfileDto,
        user: {
          id,
        },
      });
      await this.profileRepository.save(profileObject);
      return `Profile added Successfully`;
    } catch (e) {
      console.log(e);
    }
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<string> {
    const profileUpdated = await this.profileRepository.update(
      { user: { id } },
      updateProfileDto,
    );

    if (profileUpdated.affected === 0) {
      return `User ${id} not exists`;
    }

    return `User ${id} has been updated successfully`;
  }

  async findByUserId(id): Promise<ProfileEntity> {
    try {
      return await this.profileRepository.findOneOrFail({
        where: { user: { id } },
      });
    } catch (e) {
      this.logger.log(`Profile with id: ${id} not found please create one`);
      this.errorService.errorHandling(
        '404',
        'Profile not found please create one first',
      );
    }
  }
}
