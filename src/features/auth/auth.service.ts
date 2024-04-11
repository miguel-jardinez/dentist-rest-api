import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@features/users/users.service';
import { ErrorService } from '@utils/ErrorService';
import { CreateUserDto } from '@features/users/dto/create-user.dto';
import { UserEntity } from '@features/users/entities/user.entity';
import { UserRole } from '@utils/RoleEnum';
import { ResponseApi } from '@utils/ResponseApi';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly errorService: ErrorService,
    private readonly jwtService: JwtService,
  ) {}

  public register(registerAuthDto: CreateUserDto) {
    return this.userService.create(registerAuthDto);
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    try {
      const user = await this.userService.findByEmail(email);

      const isPasswordValid = await this.validateUserPassword(
        password,
        user.data.password,
      );

      if (!isPasswordValid) {
        this.errorService.errorHandling('401', 'email or password incorrect');
      }
      return user.data;
    } catch (e) {
      this.errorService.errorHandling('401', 'email or password incorrect');
    }
  }

  private async validateUserPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    try {
      return await verify(hashPassword, password);
    } catch (e) {
      this.errorService.errorHandling('401', 'email or password incorrect');
    }
  }

  public async getJsonWebToken(
    id: string,
    role: UserRole,
    profileId: string,
  ): Promise<ResponseApi<string>> {
    try {
      const payload = {
        id,
        role,
        profileId,
      };
      const token = await this.jwtService.signAsync(payload);

      return new ResponseApi(token, true, Date());
    } catch (e: any) {
      this.errorService.errorHandling(e.code);
    }
  }
}
