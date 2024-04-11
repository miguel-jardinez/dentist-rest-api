import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResponseApi } from '@utils/ResponseApi';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Req() req,
    @Res({ passthrough: true }) res,
  ): Promise<ResponseApi<string>> {
    const token = await this.authService.getJsonWebToken(
      req.user.id,
      req.user.role,
      req.user.profileId,
    );

    res.cookie('token-auth-cookie', { token: token.data }, { httpOnly: true });
    return token;
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
