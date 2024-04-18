import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { RequestUserData } from '@utils/RequestUserData';
import { UserRole } from '@utils/RoleEnum';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from '@features/auth/dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginAuthDto })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Req() req: RequestUserData,
    @Res({ passthrough: true }) res,
  ): Promise<ResponseApi<string>> {
    const token = await this.authService.getJsonWebToken(
      req.user.id,
      req.user.role as UserRole,
      req.user.profileId,
    );

    res.cookie('token-auth-cookie', { token: token.data }, { httpOnly: true });
    return token;
  }

  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
