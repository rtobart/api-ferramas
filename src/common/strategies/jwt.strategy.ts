import {
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

import config from '../env/config.env';
import { Request } from 'express';
import { JwtCustomService } from '../services/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>,
    private readonly jwtService: JwtCustomService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwt.publicKey,
      algorithms: ['HS256'],
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const auth = req.headers.authorization?.replace('Bearer', '').trim();
    if (!auth)
      throw new UnauthorizedException('Authorization not send on headers');
    const isValid = this.jwtService.validate(auth);
    if (!isValid) {
      throw new UnauthorizedException('Authorization not match');
    }
    return payload;
  }
}

