import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtCustomService {
  constructor(
    private readonly jwtService: JwtService,
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
      privateKey: process.env.JWT_PRIVATE_KEY,
      expiresIn: process.env.JWT_EXPIRE_TIME,
      algorithm: 'RS256',
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
