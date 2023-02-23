import { Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { verify } from 'argon2';
import { UsersService } from '../users/users.service';
import { ErrorService } from '../utils/ErrorService';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../utils/RoleEnum';

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
        user.password,
      );

      if (!isPasswordValid) {
        this.errorService.errorHandling('401', 'email or password incorrect');
      }
      return user;
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

  public async getJsonWebToken(id: string, role: UserRole): Promise<string> {
    const payload = {
      id,
      role,
    };
    return this.jwtService.signAsync(payload);
  }
}
