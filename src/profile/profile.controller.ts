import {
  Controller,
  Body,
  Patch,
  Param,
  Post,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/create')
  createProfile(@Body() createProfileDto: CreateProfileDto, @Req() req) {
    const id = req.user.id as string;
    return this.profileService.create(createProfileDto, id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Get('/find')
  getProfile(@Req() req) {
    return this.profileService.findByUserId(req.user);
  }
}
