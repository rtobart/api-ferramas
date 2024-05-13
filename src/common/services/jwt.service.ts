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
  validate(jwt: string): boolean {
    const auth = this.trimJWT(jwt);
    try {
      this.jwtService.verify(auth);
      return true;
    } catch (error) {
      return false;
    }
  }
}
