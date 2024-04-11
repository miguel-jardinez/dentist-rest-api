import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ErrorService } from '@utils/ErrorService';
import { UserRole } from '@utils/RoleEnum';
import { JwtPayload } from '@utils/JwtPayload';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
    private readonly errorService: ErrorService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<JwtPayload> {
    try {
      const user = await this.authService.validateUserCredentials(
        email,
        password,
      );

      if (user === null) {
        throw new UnauthorizedException();
      }

      const customerProfile = user?.customerProfile;
      const dentistProfile = user?.dentistProfile;

      return {
        id: user.id,
        role: user.role,
        profileId:
          user.role === UserRole.DENTIST
            ? dentistProfile?.id
            : customerProfile?.id,
      };
    } catch (e) {
      this.errorService.errorHandling('404', `User ${email} was not fonud`);
    }
  }
}
