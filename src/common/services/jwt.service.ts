import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import config from 'src/common/env/config.env';

@Injectable()
export class JwtCustomService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}
  getPayload(jwt: string) {
    const auth = this.trimJWT(jwt);
    const prePayload = this.jwtService.decode(auth);
    return prePayload;
  }
  getMail(jwt: string): string {
    const payload = this.getPayload(jwt);
    return payload.email;
  }
  trimJWT(jwt: string): string {
    return jwt?.replace('Bearer', '').trim();
  }
  signToken(payload: any): string {
    return this.jwtService.sign(payload, {
      privateKey: this.configService.jwt.privateKey,
      expiresIn: this.configService.jwt.expiresIn,
      algorithm: 'HS256',
    });
  }
  validate(token: string): boolean {
    const isValid = this.jwtService.verify(token, { secret: this.configService.jwt.privateKey })
    return isValid ? true : false;
  }
}
