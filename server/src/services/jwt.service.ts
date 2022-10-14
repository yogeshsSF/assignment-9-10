import {HttpErrors} from '@loopback/rest';
import {inject} from '@loopback/core';
import {UserProfile} from '@loopback/security';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {TokenService} from '@loopback/authentication';

export class jwtService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public tokenService: TokenService,
  ) {}

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        `Userprofile is null, Can't generate token`,
      );
    }

    let token = '';

    try {
      token = await this.tokenService.generateToken(userProfile);
    } catch {
      throw new HttpErrors.Unauthorized(`Can't generate token`);
    }

    return token;
  }

  async verifyToken(token: string): Promise<UserProfile> {
    try {
      var user = this.tokenService.verifyToken(token);
    } catch {
      throw new HttpErrors.Unauthorized(`Error while verifying token`);
    }
    return user;
  }
}
