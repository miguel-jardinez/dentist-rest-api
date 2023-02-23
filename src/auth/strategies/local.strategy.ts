import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ErrorService } from '../../utils/ErrorService';
import { AuthService } from '../auth.service';
import { UserRole } from '../../utils/RoleEnum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
    private readonly errorService: ErrorService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{ id: string; role: UserRole }> {
    try {
      const user = await this.authService.validateUserCredentials(
        email,
        password,
      );

      if (user === null) {
        throw new UnauthorizedException();
      }

      return { id: user.id, role: user.role };
    } catch (e) {
      this.errorService.errorHandling('404', `User ${email} was not fonud`);
    }
  }
}
