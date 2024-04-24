import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserControllerInterface } from '@features/users/interfaces/UserController.interface';
import { CreateUserDto } from '@features/users/dto/create-user.dto';
import { UserEntity } from '@features/users/entities/user.entity';
import { UsersService } from '@features/users/users.service';
import { ResponseApi } from '@utils/ResponseApi';
import { DeleteResult } from 'typeorm';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseApi } from '@utils/ApiOkResponseApi';

@ApiTags('Dentist ')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController implements UserControllerInterface {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAllUsers(): Promise<ResponseApi<UserEntity[]>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id') id: string): Promise<ResponseApi<UserEntity>> {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<ResponseApi<DeleteResult>> {
    return this.usersService.remove(id);
  }
}
